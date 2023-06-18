provider "google" {
  project = "advance-cloud-assignment"
  region  = "us-central1"
}

resource "google_container_cluster" "csci5409_assignment_cluster" {
  name               = "assignment-cluster"
  location           = "us-central1-a"
  initial_node_count = 1

  node_config {
    machine_type = "e2-medium"
    disk_size_gb = 10
    disk_type = "pd-standard"
    image_type = "COS_CONTAINERD"
  }
}

resource "google_compute_disk" "assignment_disk" {
  name  = "assignment-cluster-disk"
  size  = 10
  type  = "pd-standard"
  zone  = "us-central1-a"
}
