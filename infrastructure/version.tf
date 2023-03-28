terraform {
  required_version = "~> 1.4.2" #greater or equal than 
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>4.0"
    }
  }
}