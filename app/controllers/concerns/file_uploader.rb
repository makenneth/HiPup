module FileUploader
  extend ActiveSupport::Concern

  require 'aws-sdk-v1'
  require 'base64'

  def upload(filename, content_type, file_contents, path = "/images")
      filename = "#{SecureRandom.uuid}#{File.extname(filename)}"
      # s3 = s3_resource

      obj = s3_bucket.objects.create(
        filename, Base64.decode64(file_contents), {content_type: content_type, acl: "public_read"}
      )

      url = obj.public_url().to_s
      p url
      url
  end

  def s3_resource
    Aws::S3::Resource.new(region: 'us-west-1', credentials: aws_credential)
  end

  def s3
    # Aws::Credentials.new(ENV["ACCESS_KEY_ID"], ENV["SECRET_ACCESS_KEY"])
    AWS::S3.new(ENV["ACCESS_KEY_ID"], ENV["SECRET_ACCESS_KEY"])
  end

  def s3_bucket
    s3 = AWS::S3.new(
      :access_key_id => ENV["ACCESS_KEY_ID"],
      :secret_access_key => ENV["SECRET_ACCESS_KEY"]
    )
    s3.buckets['hipup']
  end
end