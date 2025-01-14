data "aws_ami" "ami" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  owners = ["099720109477"]
}

# Data block to fetch the snapshot
# I took the snapshot of the Jenkins server and stored it in the snapshot_id variable 
# So i can use the previously installed utilities in my jump server
data "aws_ebs_snapshot" "snapshot" {
  snapshot_id = var.snapshot_id
}
