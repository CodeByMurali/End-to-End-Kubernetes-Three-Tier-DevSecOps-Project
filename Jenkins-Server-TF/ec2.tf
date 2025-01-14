resource "aws_instance" "ec2" {
  ami                    = data.aws_ami.ami.image_id
  instance_type          = "t2.large"
  key_name               = var.key-name
  subnet_id              = aws_subnet.public-subnet.id
  vpc_security_group_ids = [aws_security_group.security-group.id]
  iam_instance_profile   = aws_iam_instance_profile.instance-profile.name

  #  # Uncomment the below block if you want to attach a new EBS volume to the instance. Default gp3 volume type is used. 
  # root_block_device {
  #   volume_size = 30
  # }

  # Configure the root volume with the snapshot
  ebs_block_device {
    device_name           = "/dev/xvda"
    volume_size           = data.aws_ebs_snapshot.snapshot.volume_size
    volume_type           = "gp3"
    delete_on_termination = true
    snapshot_id           = var.snapshot_id
  }

  user_data = templatefile("./tools-install.sh", {})

  tags = {
    Name = var.instance-name
  }
}
