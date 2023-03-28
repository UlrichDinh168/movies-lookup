# resource block use to create resource
resource "aws_s3_bucket" "cine_react_s3_bucket" {
  bucket        = "${local.prefix}-app-ulrich"
  force_destroy = true

  tags = local.common_tags
}

resource "aws_s3_bucket_acl" "cine_react_bucket_acl" {
  bucket = aws_s3_bucket.cine_react_s3_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "public_block" {
  bucket = aws_s3_bucket.cine_react_s3_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
  ignore_public_acls      = true
}

resource "aws_s3_bucket_versioning" "cine_react_bucket_versioning" {
  bucket = aws_s3_bucket.cine_react_s3_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "cine_react_bucket_website_config" {
  bucket = aws_s3_bucket.cine_react_s3_bucket.id

  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_policy" "cinema_app_bucket_policy" {
  bucket = aws_s3_bucket.cine_react_s3_bucket.id
  policy = data.aws_iam_policy_document.cine_react_bucket_policy.json
}

# Data block is used to get data already defined in resource
data "aws_iam_policy_document" "cine_react_bucket_policy" {
  statement {
    actions = ["s3:GetObject"]

    resources = [
      aws_s3_bucket.cine_react_s3_bucket.arn,
      "${aws_s3_bucket.cine_react_s3_bucket.arn}/*"
    ]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.cine_react_origin_access.iam_arn]
    }
  }

}