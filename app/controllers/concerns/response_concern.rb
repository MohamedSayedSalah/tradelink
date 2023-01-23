module ResponseConcern
  extend ActiveSupport::Concern

  def respond(result, serializer=nil, serializer_options={}, type="serializer", status=200, render_response = true)
    serialized_reponse = {}

    if result.success?
      serialized_reponse = respond_types(result, serializer, serializer_options, type, status)
    else
      serialized_reponse[:json] = result.error.respond_to?(:messages) ? result.error.messages : result.error
      serialized_reponse[:status] = result.error.respond_to?(:status) ? result.error.status : 422
    end

      puts "%%"
      puts render_response
      puts serialized_reponse
    if render_response
      return render(serialized_reponse)
    else
      return serialized_reponse
    end
  end

  def serialized_response(result, serializer=nil, serializer_options={})
    respond(result, serializer, serializer_options, "serializer", 200, false)
  end


  private
  def respond_types(result, serializer, serializer_options, type, status)
    case type
    when "serializer"
      default_respond(result, serializer, serializer_options, status)
    when "json_object"
      json_object_respond(result, status)
    when 'no_content'
      head :no_content
    else
      result = OpenStruct.new({payload: {error: "unsupported type format"}})
      json_object_respond(result, 415)
    end
  end

  #to respond with a regular serializer
  def default_respond(result, serializer, serializer_options, status)
    serialized_data = serialize_data(result, serializer, serializer_options)

    return {json: serialized_data, status: status}
  end

  ## Serialize Data
  def serialize_data(result, serializer, serializer_options)
    return serializer.new(
      result.payload, serializer_options
    ).serializable_hash.to_json
  end

  #to respond a customize json object
  def json_object_respond(result, status)
    puts "!!!!!here"
    return {json: result.payload, status: status}
  end


end
