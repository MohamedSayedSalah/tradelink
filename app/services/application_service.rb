class ApplicationService
  def handle_result(status = false, payload = {}, options = {})
    if status
      OpenStruct.new({
                                    success?: true, payload: payload, options: options
                                  })
    else
      OpenStruct.new({success?: false, error: payload, options: options })
    end
  end

end