packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.1.4"
    }
  }
}

source "googlecompute" "centos-source-image" {
  image_name   = "${var.image_name}-${formatdate("YY-MM-DD-hh-mm-ss", timestamp())}"
  project_id    =  var.gcp_project_id
  source_image = var.image_name
  ssh_username = var.ssh_username
  region       = var.region
  zone         = var.zone
  image_family = var.image_family
}

build {
  sources = ["source.googlecompute.centos-source-image"]

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {
    source      = "./webapp.service"
    destination = "/tmp/webapp.service"
  }

  provisioner "shell" {
    script = "setup.sh"
  }
}
