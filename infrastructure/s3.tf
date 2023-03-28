resource "aws_s3_bucket" "cine_react_s3_bucket" {
  bucket        = "${loca.prefix}-app-ulrich"
  force_destroy = true

  tags = local.common_tags
}

resource "aws_s3_bucket_acl" "name" {
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