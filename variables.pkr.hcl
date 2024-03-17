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

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "image_name" {
  type    = string
  default = "centos-stream-8-v20240110"
}

variable "image_family" {
  type    = string
  default = "custom-image-family"
}

variable "machine_type" {
  type    = string
  default = "e2-standard-2"
}
