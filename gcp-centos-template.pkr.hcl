packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.1.4"
    }
  }
}

source "googlecompute" "centos-source-image" {
  // image_name = "${var.image_name}_${formatdate("YY-MM-DD hh-mm-ss", timestamp())}"
  project_id   = var.gcp_project_id
  source_image = var.image_name
  ssh_username = var.ssh_username
  region       = var.region
  zone         = var.zone
  // machine_type = var.gcp_machine_type
  // credentials_file = "cloud-webapp-dev-b213a906e336.json"
}

build {
  sources = ["source.googlecompute.centos-source-image"]

  // provisioner "file" {
  //   source      = "./webapp.zip"
  //   destination = "/tmp/webapp.zip"
  // }

  provisioner "shell" {
    script = "setup.sh"
  }
}