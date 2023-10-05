# nodejs-app-ecs-deployment Setup Guide

This guide will walk you through setting up the **nodejs-app-ecs-deployment** application on an Amazon EC2 instance and it works in hand with this blog post 

## Prerequisites

Before you begin, make sure you have the following:

- An Amazon Web Services (AWS) account.
- Basic knowledge of AWS, VPCs, EC2, and security groups.
- An EC2 instance launched with a public IP address, and you have downloaded the associated `.pem` private key file.

## Step 1: SSH into Your EC2 Instance

1. Open your terminal.
2. Use the `ssh` command to connect to your EC2 instance using the public IP address and the private key file you downloaded:

```bash
ssh -i /path/to/your/private-key.pem ec2-user@your-instance-ip
```
<!-- Replace `/path/to/your/private-key.pem` with the actual path to your private key file and `your-instance-ip` with your EC2 instance's public IP address. -->

## Step 2: Install Docker and Git

### Update the package manager
```bash
sudo yum update -y
```

### install Docker
```bash
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
```

### install Git
```bash
sudo yum install git -y
```

## Step 3: Clone the nodejs-app-ecs-deployment Repository

```bash
git clone https://github.com/Audrey-me/dockerLearn.git
```


## Step 4: Configure Security Group

You need to configure your security group to allow traffic to the application ports. In this example, we will allow traffic on ports 8080 (frontend), 3000 (backend), and 8081 (mongo-express).
- Open the AWS Management Console.
- Go to the EC2 dashboard.
- Select your EC2 instance. 
- Scroll down to the "Security groups" section and click on the linked security group.
- In the "Inbound rules" tab, click "Edit inbound rules."
- Add the following inbound rules:
    - Type: Custom TCP Rule, Port Range: 8080, Source: 0.0.0.0/0
    - Type: Custom TCP Rule, Port Range: 3000, Source: 0.0.0.0/0
    - Type: Custom TCP Rule, Port Range: 8081, Source: 0.0.0.0/0
- Make sure to adjust the source IP ranges based on your security requirements.
