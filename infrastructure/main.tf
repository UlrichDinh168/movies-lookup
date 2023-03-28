provider "aws" {
  region  = "eu-north-1"
  profile = "ulrich"
}

terraform {
  backend "s3" {
    bucket  = "cine-tf-state"
    key     = "cine.tfstate"
    region  = "eu-north-1"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManageBy    = "Terraform"
    Owner       = "Ulrich Dinh"
  }
}