module DefaultSerializer
  extend ActiveSupport::Concern

  included do
    include JSONAPI::Serializer
  end
end
