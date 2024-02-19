variable "gcp_project_id" {
  type    = string
  default = "cloud-webapp-dev"
}

variable "region" {
  type    = string
  default = "us-east1"
}

variable "zone" {
  type    = string
  default = "us-east1-b"
}

variable "gcp_machine_type" {
  type    = string
  default = "e2-micro"
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "image_name" {
  type    = string
  default = "centos-stream-8-v20240110"
}