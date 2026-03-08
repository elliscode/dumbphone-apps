awsCards = [
    { "exam": "CLF-C02", "front": "Which AWS service would simplify the migration of a database to AWS?", "back": "AWS Database Migration Service" }
  , { "exam": "CLF-C02", "front": "What is a distractor service?", "back": "A service that shows up as an answer in the exam as a wrong answer." }
  , { "exam": "CLF-C02", "front": "AWS Marketplace facilitates which of the following use cases?", "back": "AWS customer can buy software that has been bundled into customized Amazon Machine Image (AMIs) by he AWS Markeplace sellers, Sell Software as a Service (SaaS) solutions to AWS customers" }
  , { "exam": "CLF-C02", "front": "What is the primary benefit of deploying an Amazon RDS Multi-AZ database with one standby?", "back": "Amazon RDS Multi-AZ enhances database availability, NOT protect from a regional failure" }
  , { "exam": "CLF-C02", "front": "Which AWS service would you choose for a data processing project that needs a schemaless database?", "back": "Amazon DynamoDB" }
  , { "exam": "CLF-C02", "front": "Which pillar of the AWS Well-Architected Framework recommends maintaining infrastructure as code (IaC)?", "back": "Operational Excellence" }
  , { "exam": "CLF-C02", "front": "What are two benefits of using AWS Elastic Load Balancing (ELB)? ", "back": "High availability, Fault tolerance" }
  , { "exam": "CLF-C02", "front": "Which of the following is a container service of AWS?", "back": "AWS Fargate" }
  , { "exam": "CLF-C02", "front": "A company would like to separate cost for AWS services by the department for cost allocation. Which of the following is the simplest way to achieve this task?", "back": "Create tags for each department" }
  , { "exam": "CLF-C02", "front": "A silicon valley based healthcare startup stores anonymized patient health data on Amazon S3. The CTO further wants to ensure that any sensitive data on S3 is discovered and identified to prevent any sensitive data leaks. As a Cloud Practitioner, which AWS service would you recommend addressing this use-case?", "back": "Amazon Macie" }
  , { "exam": "CLF-C02", "front": "Which of the following are the advantages of using the AWS Cloud? (Select TWO)", "back": "Increase speed and agility, Stop guessing about capacity" }  
  , { "exam": "CLF-C02", "front": "An IT company has a hybrid cloud architecture and it wants to centralize the server logs for its Amazon Elastic Compute Cloud (Amazon EC2) instances and on-premises servers. Which of the following is the MOST effective for this use-case?", "back": "Use Amazon CloudWatch Logs for both the Amazon EC2 instance and the on-premises servers" }
  , { "exam": "CLF-C02", "front": "AWS Compute Optimizer delivers recommendations for which of the following AWS resources? (Select two)", "back": "Amazon EC2, Amazon EC2 auto scaling groups, Amazon EBS, AWS Lambda Functions" }
  , { "exam": "CLF-C02", "front": "A cyber-security agency uses AWS Cloud and wants to carry out security assessments on its own AWS infrastructure without any prior approval from AWS. Which of the following describes/facilitates this practice?", "back": "Penetration Testing" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS authentication mechanisms supports an AWS Multi-Factor Authentication (AWS MFA) device that you can plug into a USB port on your computer?", "back": "U2F Security Key" }
  , { "exam": "CLF-C02", "front": "Which of the following statements is the MOST accurate when describing AWS Elastic Beanstalk?", "back": "It is a Platform as a Service (PaaS) that allows youto deploy and scale web applications and services" }
  , { "exam": "CLF-C02", "front": "AWS Organizations provides which of the following benefits? (Select two)", "back": "Volume discounts for Amazon EC2 and Amazon S3 aggregated across the member AWS accounts, Share the reserved Amazon EC2 instances amongst the member AWS accounts" }
  , { "exam": "CLF-C02", "front": "Which of the following Amazon S3 storage classes takes the most time to retrieve data (also known as first byte latency)?", "back": "Amazon S3 Glacier Deep Archive" }
  , { "exam": "CLF-C02", "front": "A company wants to improve the resiliency of its flagship application so it wants to move from its traditional database system to a managed AWS NoSQL database service to support active-active configuration in both the East and West US AWS regions. The active-active configuration with cross-region support is the prime criteria for any database solution that the company considers. Which AWS database service is the right fit for this requirement?", "back": "Amazon DynaoDB with global tables" }
  , { "exam": "CLF-C02", "front": "A corporation would like to simplify access management to multiple AWS accounts as well as facilitate AWS Single Sign-On (AWS SSO) access to its AWS accounts. As a Cloud Practitioner, which AWS service would you use for this task?", "back": "AWS IAM Identity center" }
  , { "exam": "CLF-C02", "front": "A company would like to optimize Amazon Elastic Compute Cloud (Amazon EC2) costs. Which of the following actions can help with this task? (Select TWO)", "back": "Purchase Amazon EC2 reserved instances (RIs), Set up Auto Scaling groups to align the number of instances with the demand" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS services have data encryption automatically enabled? (Select two)?", "back": "Amazon S3, AWS Storage Gateway" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS services can be used to forecast your AWS account usage and costs?", "back": "AWS Cost Explorer" }
  , { "exam": "CLF-C02", "front": "A company's flagship application runs on a fleet of Amazon Elastic Compute Cloud (Amazon EC2) instances. As per the new policies, the system administrators are looking for the best way to provide secure shell access to Amazon Elastic Compute Cloud (Amazon EC2) instances without opening new ports or using public IP addresses. Which tool/service will help you achieve this requirement?", "back": "AWS Systems Manager Session Manager" }
  , { "exam": "CLF-C02", "front": "Due to regulatory and compliance reasons, an organization is supposed to use a hardware device for any data encryption operations in the cloud. Which AWS service can be used to meet this compliance requirement?", "back": "AWS Cloud HSM" }
  , { "exam": "CLF-C02", "front": "Which benefit of Cloud Computing allows AWS to offer lower pay-as-you-go prices as usage from hundreds of thousands of customers is aggregated in the cloud?", "back": "Massive economies of scale" }
  , { "exam": "CLF-C02", "front": "Which AWS service can be used to subscribe to an RSS feed to be notified of the status of all AWS service interruptions?", "back": "AWS Health Dashboard - Service Health" }
  , { "exam": "CLF-C02", "front": "An IT company is on a cost-optimization spree and wants to identify all Amazon Elastic Compute Cloud (Amazon EC2) instances that are under-utilized. Which AWS services can be used off-the-shelf to address this use-case without needing any manual configurations? (Select two)", "back": "AWS Cost Explorer, AWS Trusted Advisor" }
  , { "exam": "CLF-C02", "front": "The DevOps team at an e-commerce company is trying to debug performance issues for its serverless application built using a microservices architecture. As a Cloud Practitioner, which AWS service would you recommend addressing this use-case?", "back": "AWS X-Ray" }
  , { "exam": "CLF-C02", "front": "A financial services company wants to ensure that its AWS account activity meets the governance, compliance and auditing norms. As a Cloud Practitioner, which AWS service would you recommend for this use-case?", "back": "AWS CloudTrail" }
  , { "exam": "CLF-C02", "front": "A start-up would like to quickly deploy a popular technology on AWS. As a Cloud Practitioner, which AWS tool would you use for this task?", "back": "AWS Partner Solutions (formerly QUICK STARTS)" }
  , { "exam": "CLF-C02", "front": "A gaming company is looking at a technology/service that can deliver a consistent low-latency gameplay to ensure a great user experience for end-users in various locations. Which AWS technology/service will provide the necessary low-latency access to the end-users?", "back": "AWS Local Zones" }
  , { "exam": "CLF-C02", "front": "Which of the following are correct statements regarding the AWS Shared Responsibility Model? (Select two)", "back": "AWS is responsible for Security 'of' the cloud, For abstracted services like Amazon S3, AWS operates the infrastructur elayer, the operating system, and platforms" }
  , { "exam": "CLF-C02", "front": "Which entity ensures that your application on Amazon Elastic Compute Cloud (Amazon EC2) always has the right amount of capacity to handle the current traffic demand?", "back": "Amazon EC2 auto scaling" }
  , { "exam": "CLF-C02", "front": "A Cloud Practitioner would like to get operational insights of its resources to quickly identify any issues that might impact applications using those resources. Which AWS service can help with this task?", "back": "AWS Systems Manager" }
  , { "exam": "CLF-C02", "front": "Which policy describes prohibited uses of the web services offered by Amazon Web Services?", "back": "AWS Acceptable Use Policy" }
  , { "exam": "CLF-C02", "front": "Which service gives a personalized view of the status of the AWS services that are part of your Cloud architecture so that you can quickly assess the impact on your business when AWS service(s) are experiencing issues?", "back": "AWS Health - Your account Health Dashboard" }
  , { "exam": "CLF-C02", "front": "A data analytics company is running a proprietary batch analytics application on AWS and wants to use a storage service which would be accessed by hundreds of EC2 instances simultaneously to append data to existing files. As a Cloud Practitioner, which AWS service would you suggest for this use-case?", "back": "Amazon Elastic File System (Amazon EFS)" }
  , { "exam": "CLF-C02", "front": "A medical device company is looking for a durable and cost-effective way of storing their historic data. Due to compliance requirements, the data must be stored for 10 years. Which AWS Storage solution will you suggest?", "back": "Amazon S3 Glacier Deep Archive" }
  , { "exam": "CLF-C02", "front": "A company uses reserved EC2 instances across multiple units with each unit having its own AWS account. However, some of the units under-utilize their reserved instances while other units need more reserved instances. As a Cloud Practitioner, which of the following would you recommend as the most cost-optimal solution?", "back": "Use AWS Organizations to manage AWS accounts of all units and then shar ethe reserved EC2 instances amongst all units" }
  , { "exam": "CLF-C02", "front": "An organization deploys its IT infrastructure in a combination of its on-premises data center along with AWS Cloud. How would you categorize this deployment model?", "back": "Hybrid Deployment" }
  , { "exam": "CLF-C02", "front": "A multi-national corporation wants to get expert professional advice on migrating to AWS and managing their applications on AWS Cloud. Which of the following entities would you recommend for this engagement?", "back": "APN Consulting Partner" }
  , { "exam": "CLF-C02", "front": "Which AWS service will you use to provision the same AWS infrastructure across multiple AWS accounts and regions?", "back": "AWS CloudFormation" }
  , { "exam": "CLF-C02", "front": "What is the primary benefit of deploying an Amazon Relational Database Service (Amazon RDS) database in a Read Replica configuration?", "back": "Read Replica improves database scalability" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS services offer block-level storage? (Select two)", "back": "Amazon Elastic Block Store (Amazon EBS), Instance Store" }
  , { "exam": "CLF-C02", "front": "An e-commerce company wants to store data from a recommendation engine in a database. As a Cloud Practioner, which AWS service would you recommend to provide this functionality with the LEAST operational overhead for any scale?", "back": "Amazon DynamoDB" }
  , { "exam": "CLF-C02", "front": "A Cloud Practitioner would like to deploy identical resources across all AWS regions and accounts using templates while estimating costs. Which AWS service can assist with this task?", "back": "AWS CloudFormation" }
  , { "exam": "CLF-C02", "front": "Which of the following options is NOT a feature of Amazon Inspector?", "back": "Track configuration changes" }
  , { "exam": "CLF-C02", "front": "Which of the following are the serverless computing services offered by AWS ? (Select two)", "back": "AWS Lambda, AWS Fargate" }
  , { "exam": "CLF-C02", "front": "Which option is a common stakeholder role for the AWS Cloud Adoption Framework (AWS CAF) platform perspective? (Select two)", "back": "Chief Technology Officer (CTO), Engineer" }
  , { "exam": "CLF-C02", "front": "An intern at an IT company provisioned a Linux based On-demand EC2 instance with per-second billing but terminated it within 30 seconds as he wanted to provision another instance type. What is the duration for which the instance would be charged?", "back": "60 seconds" }
  , { "exam": "CLF-C02", "front": "Which AWS Route 53 routing policy would you use to route traffic to multiple resources and also choose how much traffic is routed to each resource?", "back": "Weighted Routing" }
  , { "exam": "CLF-C02", "front": "A startup wants to provision an EC2 instance for the lowest possible cost for a long-term duration but needs to make sure that the instance would never be interrupted. As a Cloud Practitioner, which of the following options would you recommend?", "back": "EC2 Reserved Instances (RI)" }
  , { "exam": "CLF-C02", "front": "A financial services company wants to migrate from its on-premises data center to AWS Cloud. As a Cloud Practitioner, which AWS service would you recommend so that the company can compare the cost of running their IT infrastructure on-premises vs AWS Cloud?", "back": "AWS Pricing Calculator" }
  , { "exam": "CLF-C02", "front": "What is the primary use case for Amazon GuardDuty?", "back": "Detecting malicious activity and threats in your AwS accounts and workloads" }
  , { "exam": "CLF-C02", "front": "An organization maintains a separate Virtual Private Cloud (VPC) for each of its business units. Two units need to privately share data. Which is the most optimal way of privately sharing data between the two VPCs?", "back": "VPC peering conection" }
  , { "exam": "CLF-C02", "front": "Which of the following are the best practices when using AWS Organizations? (Select TWO)", "back": "Create AWS accounts per department, Restrict account privileges using Service Control Policies (SCP)" }
  , { "exam": "CLF-C02", "front": "Multi-AZ deployment is an example of which of the following?", "back": "High Availability" }
  , { "exam": "CLF-C02", "front": "A unicorn startup is building an analytics application with support for a speech-based interface. The application will accept speech-based input from users and then convey results via speech. As a Cloud Practitioner, which solution would you recommend for the given use-case?", "back": "Amazon Transcribe for convert speech, Amazon Polly to convey results to speech" }
  , { "exam": "CLF-C02", "front": "An AWS user is trying to launch an Amazon Elastic Compute Cloud (Amazon EC2) instance in a given region. What is the region-specific constraint that the Amazon Machine Image (AMI) must meet so that it can be used for this Amazon Elastic Compute Cloud (Amazon EC2) instance?", "back": "AMI must be from the same region, has no bearing on performance" }
  , { "exam": "CLF-C02", "front": "Which AWS service can be used to automate code deployment to Amazon Elastic Compute Cloud (Amazon EC2) instances as well as on-premises instances?", "back": "AWS CodeDeploy" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS services are always free to use (Select two)?", "back": "IAM, AWS Auto Scaling" }
  , { "exam": "CLF-C02", "front": "A financial services enterprise plans to enable Multi-Factor Authentication (MFA) for its employees. For ease of travel, they prefer not to use any physical devices to implement Multi-Factor Authentication (MFA). Which of the below options is best suited for this use case?", "back": "Virtual Multi-Factor Authentication (MFA) device" }
  , { "exam": "CLF-C02", "front": "A photo sharing web application wants to store thumbnails of user-uploaded images on Amazon Simple Storage Service (Amazon S3). The thumbnails are rarely used but need to be immediately accessible from the web application. The thumbnails can be regenerated easily if they are lost. Which is the most cost-effective way to store these thumbnails on Amazon Simple Storage Service (Amazon S3)?", "back": "Use Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) to store the thubnails" }
  , { "exam": "CLF-C02", "front": "A startup runs its proprietary application on docker containers. As a Cloud Practitioner, which AWS service would you recommend so that the startup can run containers and still have access to the underlying servers?", "back": "Amazon Elastic Container Service (Amazon ECS)" }
  , { "exam": "CLF-C02", "front": "Which AWS service can help you analyze your infrastructure to identify unattached or underutilized Amazon EBS Elastic Volumes?", "back": "AWS Trusted Advisor" }
  , { "exam": "CLF-C02", "front": "An IT company wants to run a log backup process every Monday at 2 AM. The usual runtime of the process is 5 minutes. As a Cloud Practitioner, which AWS services would you recommend to build a serverless solution for this use-case? (Select two)", "back": "Amazon Eventbridge, AWS Lambda" }
  , { "exam": "CLF-C02", "front": "You ONLY want to manage Applications and Data. Which type of Cloud Computing model should you use?", "back": "In the Platform as a Service model (PaaS), you only manage the data and the applications." }
  , { "exam": "CLF-C02", "front": "What is the pricing model of Cloud Computing?", "back": "Pay-as-you-go pricing" }
  , { "exam": "CLF-C02", "front": "Which Global Infrastructure identity is composed of one or more discrete data centers with redundant power, networking, and connectivity, and are used to deploy infrastructure?", "back": "Availability Zones" }
  , { "exam": "CLF-C02", "front": "Which of the following is NOT one of the Five Characteristics of Cloud Computing?", "back": "Dedicated Support Agent to help you deploy applications" }
  , { "exam": "CLF-C02", "front": "Which are the 3 pricing fundamentals of the AWS Cloud?", "back": "Compute, Storage, and Data Transfer out of the AWS Cloud" }
  , { "exam": "CLF-C02", "front": "Which of the following options is NOT a point of consideration when choosing an AWS Region? ", "back": "Capacity availability" }
  , { "exam": "CLF-C02", "front": "Which of the following is NOT an advantage of Cloud Computing?", "back": "Train Employees Less" }
  , { "exam": "CLF-C02", "front": "AWS Regions are composed of?", "back": "Three or more Availability Zones" }
  , { "exam": "CLF-C02", "front": "Which of the following services has a global scope?", "back": "IAM" }
  , { "exam": "CLF-C02", "front": "Which of the following is the definition of Cloud Computing?", "back": "On-demand availability of computer system resources, especially data storage (cloud storage) and computing power, without direfct active management by the user." }
  , { "exam": "CLF-C02", "front": "What defines the distribution of responsibilities for security in the AWS Cloud?", "back": "The Shared Responsibility Model" }
  , { "exam": "CLF-C02", "front": "A company would like to benefit from the advantages of the Public Cloud but would like to keep sensitive assets in its own infrastructure. Which deployment model should the company use?", "back": "Hybrid Cloud" }
  , { "exam": "CLF-C02", "front": "What is NOT authorized to do on AWS according to the AWS Acceptable Use Policy?", "back": "Run analytics on stolen content" }
  , { "exam": "CLF-C02", "front": "What is a proper definition of IAM Roles?", "back": "An IAM entity that defines a set of permissions for making AWS service requests, that will be used by AWS services" }
  , { "exam": "CLF-C02", "front": "Which of the following is an IAM Security Tool?", "back": "IAM Credentials Report" }
  , { "exam": "CLF-C02", "front": "Which answer is INCORRECT regarding IAM Users?", "back": "IAM Users access AWS wih the root account credentials" }
  , { "exam": "CLF-C02", "front": "Which of the following is an IAM best practice?", "back": "Don't use the root user account" }
  , { "exam": "CLF-C02", "front": "What are IAM Policies?", "back": "JSON documents to define Users, Groups or Roles' permissions" }
  , { "exam": "CLF-C02", "front": "Under the shared responsibility model, what is the customer responsible for in IAM?", "back": "Assigning users proper IAM Policies" }
  , { "exam": "CLF-C02", "front": "Which principle should you apply regarding IAM Permissions?", "back": "Grant least privilege" }
  , { "exam": "CLF-C02", "front": "What should you do to increase your root account security?", "back": "Enable Multi-Factor Authentication (MFA)" }
  , { "exam": "CLF-C02", "front": "Which EC2 Purchasing Option can provide the biggest discount, but is not suitable for critical jobs or databases?", "back": "Spot Instances" }
  , { "exam": "CLF-C02", "front": "Which network security tool can you use to control traffic in and out of EC2 Instances?", "back": "Security Groups" }
  , { "exam": "CLF-C02", "front": "Under the Shared Responsibility Model, who is responsible for operating-system patches and updates on EC2 Instances?", "back": "The customer" }
  , { "exam": "CLF-C02", "front": "How long can you reserve an EC2 Reserved Instance?", "back": "1 or 3 years, not anything in between" }
  , { "exam": "CLF-C02", "front": "A company would like to deploy a high-performance computing (HPC) application on EC2. Which EC2 instance type should it choose?", "back": "Compute Optimized" }
  , { "exam": "CLF-C02", "front": "Which EC2 Purchasing Option should you use for an application you plan on running on a server continuously for 1 year?", "back": "Reserved Instances" }
  , { "exam": "CLF-C02", "front": "Which EC2 Storage would you use to create a shared network file system for your EC2 Instances?", "back": "Amazon EFS" }
  , { "exam": "CLF-C02", "front": "Which service can be used to automate image management processes?", "back": "EC2 Image Builder" }
  , { "exam": "CLF-C02", "front": "Which of the following is a fully managed native Microsoft Windows file system?", "back": "FSx" }
  , { "exam": "CLF-C02", "front": "What are AMIs NOT used for?", "back": "Add your own IP Addresses" }
  , { "exam": "CLF-C02", "front": "EBS Volumes CANNOT be attached to multiple EC2 instances at a time.", "back": "True" }
  , { "exam": "CLF-C02", "front": "An EBS Volume is a network drive you can attach to your instances while they run, so your instances' data persist even after their termination.", "back": "True" }
  , { "exam": "CLF-C02", "front": "EC2 instance store has a better I/O performance than EBS, but the data is lsot of the EC2 instance is terminated", "back": "" }
  , { "exam": "CLF-C02", "front": "What is an EBS Snapshot?", "back": "A backup of your EBS volume at a point in time" }
  , { "exam": "CLF-C02", "front": "Where can you find a third party's AMI so you can use it to launch your EC2 Instance?", "back": "AWS Marketplace AMIs" }
  , { "exam": "CLF-C02", "front": "What is an EBS Volume tied to?", "back": "An Availability Zone (AZ)" }
  , { "exam": "CLF-C02", "front": "What is the main purpose of High Availability in the Cloud?", "back": "Application thrivig even in case of a disaster" }
  , { "exam": "CLF-C02", "front": "Which AWS offered Load Balancer should you use to handle hundreds of thousands of connections with low latency?", "back": "Network Load Balancer" }
  , { "exam": "CLF-C02", "front": "Changing an EC2 Instance Type from a t3a.medium to a t3a.2xlarge is an example of?", "back": "Vertical Scaling" }
  , { "exam": "CLF-C02", "front": "What can you use to handle quickly and automatically the changing load on your websites and applications by adding compute resources?", "back": "An auto-scaling group" }
  , { "exam": "CLF-C02", "front": "What do Auto Scaling Groups do?", "back": "Replace unhealthy instances, are cost-effective by running at optimal capacity, automatically register new instances ot a load balancer" }
  , { "exam": "CLF-C02", "front": "Which Load Balancer is best suited for HTTP/HTTPS load balancing traffic?", "back": "Application Load Balancer" }
  , { "exam": "CLF-C02", "front": "What are the three Auto Scaling Strategies?", "back": "Manual Scaling, Dynamic Scaling, Predictive Scaling" }
  , { "exam": "CLF-C02", "front": "Which AWS service offers easy horizontal scaling of compute capacity?", "back": "ASG" }
  , { "exam": "CLF-C02", "front": "What are the features of load balancers?", "back": "Do regular health checks to your instances, Spread load across multiple dosntream instances, handle failures of downstream instances" }
  , { "exam": "CLF-C02", "front": "Which S3 Storage Class is the most cost-effective for archiving data with no retrieval time requirement?", "back": "Amazon Glacier Deep Archive" }
  , { "exam": "CLF-C02", "front": "What hybrid AWS service is used to allow on-premises servers to seamlessly use the AWS Cloud at the storage layer?", "back": "Storage Gateway" }
  , { "exam": "CLF-C02", "front": "What are S3 objects composed of?", "back": "Key, Value, Metadata" }
  , { "exam": "CLF-C02", "front": "Where are objects stored in Amazon S3", "back": "Buckets" }
  , { "exam": "CLF-C02", "front": "What can you use to define actions to move S3 objects between different storage classes?", "back": "Lifecycle Rules" }
  , { "exam": "CLF-C02", "front": "A non-profit organization needs to regularly transfer petabytes of data to the cloud and to have access to local computing capacity. Which service can help with this task?", "back": "Snowball Edge - Storage Optimized" }
  , { "exam": "CLF-C02", "front": "Which S3 Storage Class is suitable for less frequently accessed data, but with rapid access when needed, while keeping a high durability and allowing an Availability Zone failure?", "back": "Amazon S3 Standard-Infrequent Access" }
  , { "exam": "CLF-C02", "front": "You want to create a decentralized blockchain on AWS. Which AWS service would you use?", "back": "Managed Blockchain" }
  , { "exam": "CLF-C02", "front": "Which AWS database is a data warehouse?", "back": "Redshift" }
  , { "exam": "CLF-C02", "front": "Which AWS service is always serverless and has SQL capabilities?", "back": "Athena" }
  , { "exam": "CLF-C02", "front": "What is Amazon Athena?", "back": "Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastrcture to manage, and you pay only for the queries that you run." }
  , { "exam": "CLF-C02", "front": "You would like to use a serverless service to prepare data so it can be loaded for analytics. Which service would you use?", "back": "AWS Glue" }
  , { "exam": "CLF-C02", "front": "What is AWS Glue?", "back": "AWS Glue is a fully managed extract, transform, and load (ETL) service that makes it easy for customers to prepare and load their data for analytics." }
  , { "exam": "CLF-C02", "front": "Which relational database is a proprietary technology from AWS and is cloud-optimized?", "back": "Amazon Aurora" }
  , { "exam": "CLF-C02", "front": "You would like to migrate databases to AWS while still being able to use the database during the migration. What service allows you to do this?", "back": "Database Migration Service (DMS)" }
  , { "exam": "CLF-C02", "front": "How can you create Hadoop clusters to analyze and process a vast amount of data?", "back": "EMR" }
  , { "exam": "CLF-C02", "front": "Which in-memory AWS database can you use to reduce the load off databases and has high performance, low latency?", "back": "ElastiCache" }
  , { "exam": "CLF-C02", "front": "What is the name of a central repository to store structural and operational metadata for data assets in AWS Glue?", "back": "Glue Data Catalog" }
  , { "exam": "CLF-C02", "front": "Which of the following databases is a managed service with SQL capability suited for Online Transaction Processing (OLTP)?", "back": "RDS" }
  , { "exam": "CLF-C02", "front": "You would like to set up a NoSQL database that can scale with no downtime and can handle millions of requests per second. Which AWS database is best suited for this work?", "back": "DynamoDB" }
  , { "exam": "CLF-C02", "front": "Which AWS service can create complex graphs for fraud detection?", "back": "Neptune" }
  , { "exam": "CLF-C02", "front": "What is Amazon Neptune?", "back": "Amazon Neptune is a fast, reliable, fully-managed graph database service that makes it easy to build and run applications that work with highly connected datasets. It can be used for knowledge graphs, fraud detection, recommendations engines, social networking, etc." }
  , { "exam": "CLF-C02", "front": "Which AWS serverless service can use machine learning-powered business intelligence to create interactive dashboards such as business analytics?", "back": "QuickSignt" }
  , { "exam": "CLF-C02", "front": "What is Amazon Quicksight?", "back": "A fast, cloud-powered business intelligence (BI) service that makes it easy for you to deliver insights to everyone in your organization. You can create and publish interactive dashboards." }
  , { "exam": "CLF-C02", "front": "A company would like to set up a fully managed MongoDB database. Which AWS database is best-suited for this task?", "back": "DocumentDB" }
  , { "exam": "CLF-C02", "front": "Which exclusive DynamoDB feature is an in-memory cache that can improve your performance up to 10x?", "back": "DynamoDB Accelerator" }
  , { "exam": "CLF-C02", "front": "RDS Multi-AZ deployments’ main purpose is high availability, while RDS Read replicas’ main purpose is scalability.", "back": "True" }
  , { "exam": "CLF-C02", "front": "How do you get charged in AWS Lambda?", "back": "Per call and duration" }
  , { "exam": "CLF-C02", "front": "You would like to launch Docker containers in AWS without worrying about provisioning or managing any infrastructure. The Docker containers will be used to host a heavy workloads to serve different types of requests. Some requests may need up to 30 minutes to be completed. Which AWS service should you use to run Docker containers in a Serverless way and satisfy the requirements?", "back": "Fargate" }
  , { "exam": "CLF-C02", "front": "A complete cloud beginner would like to create a simple application with predictable pricing. What service should this person use?", "back": "Lightsail" }
  , { "exam": "CLF-C02", "front": "What is the name of the software development platform that allows you to run applications the same way, regardless of where they are run?", "back": "Docker" }
  , { "exam": "CLF-C02", "front": "How would you best describe 'event-driven' in AWS Lambda?", "back": "Happens when needed" }
  , { "exam": "CLF-C02", "front": "Which AWS service allows you to launch Docker containers on AWS, but requires you to provision and maintain the infrastructure?", "back": "ECS" }
  , { "exam": "CLF-C02", "front": "What does serverless mean?", "back": "It means you can deploy functions as a service, you don't need to manage servers, and lambda is the serverless pioneer. Saying 'there are no servers' are false." }
  , { "exam": "CLF-C02", "front": "A company needs to run thousands of jobs but would like to NOT manage the compute resources. What service can it use?", "back": "Batch" }
  , { "exam": "CLF-C02", "front": "What is AWS Batch?", "back": "AWS Batch allows developers, scientists, and engineers to easily adn efficiently run hundreds of thousands of batch computing jobs on AWS. AWS Batch dynmically provisions the optimal quantity and type of compute resources based on the volume and specific resource requirements of the batch jobs submitted." }
  , { "exam": "CLF-C02", "front": "Where should you store your private Docker images so they can be run by ECS or Fargate?", "back": "Elastic Container Registry" }
  , { "exam": "CLF-C02", "front": "Which AWS serverless service can be used by developers to create APIs?", "back": "API Gateway" }
  , { "exam": "CLF-C02", "front": "Which AWS managed service allows to automate software deployments to a hybrid mix of EC2 Instances and On-Premises servers?", "back": "CodeDeploy" }
  , { "exam": "CLF-C02", "front": "What is CodeDeploy?", "back": "AWS CodeDeploy is a service that automates code deployments to any instance, including amazon EC2 instances and instances running on-premises." }
  , { "exam": "CLF-C02", "front": "You are a software developer working on a project with your team. You need a secure and reliable version control system to store, share, and collaborate your code with the team. Which AWS service can help the developers?", "back": "AWS CodeCommit" }
  , { "exam": "CLF-C02", "front": "You need a unified user interface that gives you visibility, control, and patching capabilities for your EC2 Instances on AWS, as well as for servers running in your on-premises data centers. Which service should you use?", "back": "AWS Systems Manager" }
  , { "exam": "CLF-C02", "front": "A developer would like to deploy infrastructure on AWS but only knows Python. Which AWS service can assist him?", "back": "Cloud Development Kit (CDK)" }
  , { "exam": "CLF-C02", "front": "What is the Cloud Development Kit (CDK)?", "back": "The AWS Cloud Development Kit (AWS CDK) is an open source software development framework to define your cloud application resources using familiar programming languages." }
  , { "exam": "CLF-C02", "front": "Which of the following allows you to deploy any AWS Infrastructure as a Code?", "back": "CloudFormation" }
  , { "exam": "CLF-C02", "front": "Which service is referred to as a Platform as a Service (PaaS)?", "back": "Elastic Beanstalk" }
  , { "exam": "CLF-C02", "front": "What is called the declaration of the AWS resources that make up a stack?", "back": "CloudFormation Templates" }
  , { "exam": "CLF-C02", "front": "Which of the following services can a developer use to store code dependencies?", "back": "CodeArtifact" }
  , { "exam": "CLF-C02", "front": "Which serverless service can be used to build code and run tests?", "back": "CodeBuild" }
  , { "exam": "CLF-C02", "front": "CloudFormation and Elastic Beanstalk are free to use.", "back": "True" }
  , { "exam": "CLF-C02", "front": "Which Route 53 Routing Policies would you use to route traffic to multiple resources in proportions that you specify?", "back": "Weighted Routing Policy" }
  , { "exam": "CLF-C02", "front": "Which service is optimized to deploy ultra-low latency applications to 5G devices?", "back": "Wavelength" }
  , { "exam": "CLF-C02", "front": "What is AWS Wavelength?", "back": "An AWS Infrastructure offering optimized for mobile edge computing applications." }
  , { "exam": "CLF-C02", "front": "You need to enable fast, easy, and secure transfers of files over long distances on S3. Which service would you use?", "back": "S3 Transfer Acceleration" }
  , { "exam": "CLF-C02", "front": "What does AWS CloudFront use to improve read performance?", "back": "Caching Content in Edge Locations" }
  , { "exam": "CLF-C02", "front": "Which service can be used to run AWS infrastructure and services on-premises for a hybrid cloud architecture?", "back": "AWS Outposts" }
  , { "exam": "CLF-C02", "front": "What are the reasons for a global application?", "back": "Decreased Latency, Distaster Recovery, Attack Protection" }
  , { "exam": "CLF-C02", "front": "Which features are available with Route 53?", "back": "Domain Registration, DNS, Health Checks, Routing Policy" }
  , { "exam": "CLF-C02", "front": "With which services does CloudFront integrate to protect against web attacks?", "back": "WAF & Shield" }
  , { "exam": "CLF-C02", "front": "A company using Apache ActiveMQ is migrating to the cloud. Which AWS service can it use to easily set up and operate its message brokers in the cloud?", "back": "Amazon MQ" }
  , { "exam": "CLF-C02", "front": "Which service is a fully managed pub/sub messaging service that makes it easy to set up, operate, and send notifications from the cloud, using a push-based system?", "back": "Simple Notification Service (SNS)" }
  , { "exam": "CLF-C02", "front": "You can use Kinesis to perform real-time analysis from video streams.", "back": "True" }
  , { "exam": "CLF-C02", "front": "Which principle is mainly applied when using Amazon SQS or Amazon SNS?", "back": "Decouple your applications" }
  , { "exam": "CLF-C02", "front": "Which service allows you to send, store, and receive messages between software components at any volume, without losing messages or requiring other services to be available, using a pull-based system?", "back": "SQS" }
  , { "exam": "CLF-C02", "front": "Which CloudWatch feature would you use to trigger notifications when a metric reaches a threshold you specify?", "back": "CloudWatch Alarms" }
  , { "exam": "CLF-C02", "front": "Which AWS service helps developers analyze and debug production as well as distributed applications?", "back": "X-Ray" }
  , { "exam": "CLF-C02", "front": "Which AWS service provides alerts and remediation guidance when AWS is experiencing events that may impact you?", "back": "AWS Account Health Dashboard" }
  , { "exam": "CLF-C02", "front": "You need to set up metrics monitoring for every service in AWS. Which service would you use?", "back": "CloudWatch" }
  , { "exam": "CLF-C02", "front": "Which service allows you to inspect, audit, and record events and API calls made within your AWS account?", "back": "CloudTrail" }
  , { "exam": "CLF-C02", "front": "Which AWS service automatically analyzes code and provides performance recommendations?", "back": "CodeGuru" }
  , { "exam": "CLF-C02", "front": "How would you describe Amazon CloudWatch Logs?", "back": "A single, highly scalable service that centralizes the logs from all of your systems, applications, and AWS services that you use" }
  , { "exam": "CLF-C02", "front": "If a resource is deleted in AWS, which service should you use to investigate first?", "back": "CloudTrail" }
  , { "exam": "CLF-C02", "front": "Your private subnets need to connect to the Internet while still remaining private. Which AWS-managed VPC component allows you to do this?", "back": "NAT Gateways" }
  , { "exam": "CLF-C02", "front": "A public subnet is accessible from the Internet while a private subnet is not accessible from the Internet.", "back": "True" }
  , { "exam": "CLF-C02", "front": "Which type of firewall has both ALLOW and DENY rules and operates at the subnet level?", "back": "Network Access Control List (NACL)" }
  , { "exam": "CLF-C02", "front": "You would like to connect hundreds of VPCs and your on-premises data centers together. Which AWS service allows you to do link all these together efficiently?", "back": "" }
  , { "exam": "CLF-C02", "front": "What is Site-to-Site VPN?", "back": "Allows you to enable access to your remote network from your VPC. It goes over the public internet. It does not connect VPCs together." }
  , { "exam": "CLF-C02", "front": "What is a Transit Gateway?", "back": "Transit Gateway connects thousands of VPC and on-premises networks together in a single gateway." }
  , { "exam": "CLF-C02", "front": "You would like to connect hundreds of VPCs and your on-premises data centers together. Which AWS service allows you to do link all these together efficiently?", "back": "Transit Gateway" }
  , { "exam": "CLF-C02", "front": "A company needs two VPCs to communicate with each other. What can they use?", "back": "VPC Peering" }
  , { "exam": "CLF-C02", "front": "What is VPC Peering?", "back": "VPC Peering connection is a networking connection between two VPCs using AWS' network." }
  , { "exam": "CLF-C02", "front": "You need a logically isolated section of AWS, where you can launch AWS resources in a private network that you define. What should you use?", "back": "VPC" }
  , { "exam": "CLF-C02", "front": "A company needs to have a private, secure, and fast connection between its on-premises data centers and the AWS Cloud. Which connection should they use?", "back": "AWS Direct Connect" }
  , { "exam": "CLF-C02", "front": "Your VPC needs to connect with the Internet. Which VPC component can help?", "back": "Internet Gateway" }
  , { "exam": "CLF-C02", "front": "What is an Internet Gateway?", "back": "An internet gateway is a horizontally scaled, redundant, and highly avaulable VPC component that allows communication between your VPC and the internet." }
  , { "exam": "CLF-C02", "front": "Data sitting on an RDS instance would be referred to as?", "back": "Data at rest" }
  , { "exam": "CLF-C02", "front": "According to the Shared Responsibility Model, who is responsible for firewall and network configuration for EC2 Instances?", "back": "The Customer" }
  , { "exam": "CLF-C02", "front": "Which of the following services can you use to discover and protect your sensitive data in AWS?", "back": "Amazon Macie" }
  , { "exam": "CLF-C02", "front": "What is Amazon Macie?", "back": "Amazon Macie is a security service that uses machine learning to automatically discover, classify, and protect sensitive data in AWS< such as personally identifiable information (PII) or intellectual property." }
  , { "exam": "CLF-C02", "front": "Which AWS service lets you quickly find the root of potential security issues to take faster actions?", "back": "Amazon Detective" }
  , { "exam": "CLF-C02", "front": "What is Amazon Detective?", "back": "Amazon Detective makes it easy to analyze, investigate, and quickly identify the root cause of potential security issues or suspicious activities." }
  , { "exam": "CLF-C02", "front": "A company would like to protect its web applications from common web exploits that may affect availability, compromise security, or consume excessive resources. Which AWS service should they use?", "back": "Web Application Firewall (WAF)" }
  , { "exam": "CLF-C02", "front": "What is AWS Shield?", "back": "AWS Shield is a managed Distributed Denial of Service (DDoS) protection service that safeguards applications running on AWS. It does not protect from all common web exploits." }
  , { "exam": "CLF-C02", "front": "What is AWS Web Application Firewall (WAF)?", "back": "AWS WAF is a web application firewall that helps protect your web applications or APIs against common web exploits that may affect availability, compromise security, or consume excessive resources." }
  , { "exam": "CLF-C02", "front": "Where can you find on-demand access to AWS compliance documentation and AWS agreements?", "back": "AWS Artifact" }
  , { "exam": "CLF-C02", "front": "What is AWS Artifact?", "back": "AWS Artifact is your go-to, central resource for compliance related information that matters to you." }
  , { "exam": "CLF-C02", "front": "You can perform any kind of penetration testing on any AWS service without prior approval.", "back": "False. Penetration testing is allowed without prior approval on 8 services. DDoS, port flooding, and protocol flooding are examples of prohibited activiites." }
  , { "exam": "CLF-C02", "front": "You want to record configurations and changes over time. Which service allows you to do this?", "back": "AWS Config" }
  , { "exam": "CLF-C02", "front": "A company would like to secure network communications using SSL & TLS certificates. Which AWS service can it use?", "back": "Certificate Manager (ACM)" }
  , { "exam": "CLF-C02", "front": "According to the Shared Responsibility Model, who is responsible for Patch Management?", "back": "AWS and the customer" }
  , { "exam": "CLF-C02", "front": "You want to centrally automate security checks across several AWS accounts. Which AWS service can you use?", "back": "AWS Security Hub" }
  , { "exam": "CLF-C02", "front": "What is AWS Security Hub?", "back": "AWS Security hub provides you with a comprehensive view of your security state within AWS and your compliance with the security standards and best practices" }
  , { "exam": "CLF-C02", "front": "What is the AWS managed encryption key manager?", "back": "KMS" }
  , { "exam": "CLF-C02", "front": "A company would like to automate security on EC2 instances to assess security and vulnerabilities in these instances. Which AWS service should it use?", "back": "Amazon Inspector" }
  , { "exam": "CLF-C02", "front": "What is Amazon Inspector?", "back": "Amazon Inspector is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS. It helps you test the network accessibility of your Amazo EC2 instances and the security state of your applications running on the instances." }
  , { "exam": "CLF-C02", "front": "Which actions require the root user?", "back": "Close your AWS accout, change your AWS support plan, register as a seller in the Reserved Instance Marketplace. Access the billing dashboard DOES NOT require root." }
  , { "exam": "CLF-C02", "front": "According to the Shared Responsibility Model, who is responsible for protecting hardware?", "back": "AWS" }
  , { "exam": "CLF-C02", "front": "Which AWS service's ONLY role is to safeguard running applications from DDoS attacks?", "back": "AWS Shield" }
  , { "exam": "CLF-C02", "front": "Which service is a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts and workloads?", "back": "Amazon GuardDuty" }
  , { "exam": "CLF-C02", "front": "What is Amazon GuardDuty?", "back": "Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts and workloads." }
  , { "exam": "CLF-C02", "front": "When should you contact the AWS abuse team?", "back": "DDoS attack from AWS-owned IP addresses, Spam from AWS-owned IP addresses or AWS resources, Hosting objectionable or copyrighted content on AWS" }
  , { "exam": "CLF-C02", "front": "What do you use to turn text into lifelike speeech using deep learning?", "back": "Amazon Polly." }
  , { "exam": "CLF-C02", "front": "What do you use to convert speech to text?", "back": "Amazon Transcribe." }
  , { "exam": "CLF-C02", "front": "A company would like to implement a chatbot that will convert speech-to-text and recognize the customers' intentions. What service should it use?", "back": "Amazon Lex" }
  , { "exam": "CLF-C02", "front": "What do you use to convert Speech to Text and recognize the customers intentions?", "back": "Amazon Lex" }
  , { "exam": "CLF-C02", "front": "You would like to find objects, people, text, or scenes in images and videos. What AWS service should you use?", "back": "Rekognition" }
  , { "exam": "CLF-C02", "front": "What is Amazon Rekognition?", "back": "Amazon Rekognition makes it easy to add image and video analysis to your application using proven, highly scalable, deep learning technology that requires no machine learning expertise to use." }
  , { "exam": "CLF-C02", "front": "A start-up would like to rapidly create customized user experiences. Which AWS service can help?", "back": "Amazon Personalize is a machine learning service that makes it easy for developers to create individualied recommendations for cusotmers using their applications." }
  , { "exam": "CLF-C02", "front": "What is Amazon Kendra?", "back": "Amazon Kendra is a highly accurate and easy to use enterprise search service that's powered by machine learning." }
  , { "exam": "CLF-C02", "front": "A research team would like to group articles by topics using Natural Language Processing (NLP). Which service should they use?", "back": "Amazon Comprehend" }
  , { "exam": "CLF-C02", "front": "What is Amazon Comprehend?", "back": "Amazon Comprehend is a natural languate processing (NLP) service that uses machine learning to find meaning and insights in text." }
  , { "exam": "CLF-C02", "front": "A company would like to convert its documents into different languages, with natural and accurate wording. What should they use?", "back": "Amazon Translate" }
  , { "exam": "CLF-C02", "front": "What is Amazon Translate?", "back": "Amazon Translate is a neural machine translations ervice that delivers fast, high-quality, and affordable language translation." }
  , { "exam": "CLF-C02", "front": "A developer would like to build, train, and deploy a machine learning model quickly. Which service can he use?", "back": "SageMaker" }
  , { "exam": "CLF-C02", "front": "Which AWS service makes it easy to convert speech-to-text?", "back": "Amazon Transcribe" }
  , { "exam": "CLF-C02", "front": "What is Amazon Transcribe?", "back": "Amazon Transcribe is an AWS service that makes it easy for customers to convert speech-to-text" }
  , { "exam": "CLF-C02", "front": "Which of the following services is a document search service powered by machine learning?", "back": "Amazon Kendra" }
  , { "exam": "CLF-C02", "front": "What is Amazon Kendra?", "back": "Amazon Kendra is a highly accurate and easy to use enterprise search service that's powered by machine learning." }
  , { "exam": "CLF-C02", "front": "Which services are free to use in AWS?", "back": "IAM, VPC, Consolidated Billing, and Elastic Beanstalk" }
  , { "exam": "CLF-C02", "front": "CloudFront pricing is the same in every geographic region.", "back": "False" }
  , { "exam": "CLF-C02", "front": "When you reserve, the larger the upfront payment, the smaller the discount.", "back": "False, the larger the upfront, the bigger the discount." }
  , { "exam": "CLF-C02", "front": "What are the pricing factors in S3?", "back": "Storage Class, Objects Size, Type of requests. Data transfer into S3 IS NOT charged, it is free." }
  , { "exam": "CLF-C02", "front": "EBS Snapshots are added cost in GB per month.", "back": "True" }
  , { "exam": "CLF-C02", "front": "Which of the following options can provide up to 66% discount compared to On-demand for a commitment to a consistent amount of usage for 1 or 3 years and offers the possibility to change EC2 instances family type?", "back": "Compute Savings Plans provide the most flexibility and help to reduce your costs by up to 66% in exchange for a commitment to a consistent amount of usage for a 1 or 3 year term. These plans automatically apply to EC2 instance usgae regardless of instance family, size, AZ, region, os, or tenancy, and also apply to Fargate or Lambda usage." }
  , { "exam": "CLF-C02", "front": "What is an alternative to Reserved Instances?", "back": "Compute Savings Plans, they offer a smaller discount but are more flexible." }
  , { "exam": "CLF-C02", "front": "You are running an on-demand Linux EC2 instance, what timing is applied regarding billing?", "back": "Pay per second" }
  , { "exam": "CLF-C02", "front": "Which pricing model allows you to minimize risks, predictably manage budgets, and comply with long-term requirements, and is available for EC2, DynamoDB, ElastiCache, RDS, and Redshift?", "back": "Save when you reserve" }
  , { "exam": "CLF-C02", "front": "Which RDS pricing option is the most cost-effective if you need capacity for 3 years?", "back": "Reserved Instances" }
  , { "exam": "CLF-C02", "front": "A company would like to use their on-premises Microsoft Active Directory to connect to its AWS resources. Which service can it use?", "back": "AWS Directory Services" }
  , { "exam": "CLF-C02", "front": "What is AWS Directory Service?", "back": "AWS Directory Service makes it easy for you to set up and run directories in the AWS cloud, or connect your AWS resources iwth an existing on-premises Microsoft Active Directory" }
  , { "exam": "CLF-C02", "front": "which AWS service allows you to create temporary, limited-privilege credentials for your AWS resources?", "back": "Security Token Service" }
  , { "exam": "CLF-C02", "front": "A company just created a new mobile application and wants to add a simple and secure user sign-up, sign-in, and access control. Which AWS service can it use?", "back": "Amazon Cognito" }
  , { "exam": "CLF-C02", "front": "A company would like to centrally manage access to multiple AWS accounts and business applications. Which service can it use?", "back": "AWS IAM Identity Center" }
  , { "exam": "CLF-C02", "front": "What is AWS IAM Identity Center?", "back": "AWS IAM Identity Center is an AWS Service that enables you to make it easy to centrally manage access to multiple AWS accounts and business application sna dprovide users with single sign-on acces to all their assigned accounts and applications from one place." }
  , { "exam": "CLF-C02", "front": "You would like to access desktop applications through a browser. Which AWS service would you use?", "back": "AppStream 2.0" }
  , { "exam": "CLF-C02", "front": "Which AWS service can be used to test your application across real desktop browsers and mobile devices?", "back": "AWS Device Farm" }
  , { "exam": "CLF-C02", "front": "Which AWS service is serverless and lets you connect billions of devices to the AWS Cloud?", "back": "IoT Core" }
  , { "exam": "CLF-C02", "front": "CloudEndure Disaster Recovery is used to centrally automate backups across AWS services while AWS Backup is used to quickly and easily recover servers into AWS.", "back": "False, AWS Backup is a centralized backup service that makes it easy and cost effective for yout. o backup your application data across AWS services. CloudEndure Distater Recovery minimizes downtime and data loss by providing fast, reliable recovery into AWS of your phusical virtual, and cloud-based servers." }
  , { "exam": "CLF-C02", "front": "What is AWS Backup?", "back": "AWS Backup is a centralized backup service that makes it easy and cost effective for yout. o backup your application data across AWS services." }
  , { "exam": "CLF-C02", "front": "What is CloudEndure Distaster Recovery?", "back": "CloudEndure Distater Recovery minimizes downtime and data loss by providing fast, reliable recovery into AWS of your phusical virtual, and cloud-based servers." }
  , { "exam": "CLF-C02", "front": "A hybrid company would like to provision desktops to their employees so they can access securely both the AWS Cloud and their data centers. Which AWS service can help?", "back": "Amazon WorkSpaces" }
  , { "exam": "CLF-C02", "front": "Auto Scaling in EC2 and DynamoDB are examples of?", "back": "Horizontal Scaling" }
  , { "exam": "CLF-C02", "front": "What is the AWS Well-Architected tool?", "back": "The AWS well-architected tool helps you review the state of your workload snad compares them to the latest AWS architecturla best practices. It is based on the 6 pillars of hte well-architected framework (Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainablility." }
  , { "exam": "CLF-C02", "front": "What is AWS Trusted Advisor?", "back": "AWS Trusted Advisor is an online tool that provides you realtime guidance to help you real time guidance to help you provision your resources folliwng AWS best practices (Cost Optimization, Performance, Security, Fault Tolerance, and Service Limits)" }
  , { "exam": "CLF-C02", "front": "Which of the following are design principles of Performance Efficiency?", "back": "Go global in minutes & expiriment more often" }
  , { "exam": "CLF-C02", "front": "What are AWS Partner Network (APN) types?", "back": "APN technology partners, APN consuitling partners, APN training partners" }
  , { "exam": "CLF-C02", "front": "What are principles of performance efficiency?", "back": "democratize advanced technologies go global in minutes, use serverless architectrure, experiment more often, mechanical sympathy" }
  , { "exam": "CLF-C02", "front": "Which AWS service is the key ot Operation Excellence?", "back": "CloudFormation is a key service to Operational Excellence as it prepares, operaties, and evolves, but also performs operations as code." }
  , { "exam": "CLF-C02", "front": "AWS Cost Explorer and AWS Trusted Advisor are services examples of which Well-Architected Framework pillar?", "back": "Cost Optimization" }
  , { "exam": "CLF-C02", "front": "Implementing Security Groups, NACLs, KMS, or CloudTrail reflects which Well-Architected Framework Pillar?", "back": "Security" }
  , { "exam": "CLF-C02", "front": "AWS Web Application Firewall (WAF) offers protection from common web exploits at which layer?", "back": "Layer 7" }
  , { "exam": "CLF-C02", "front": "Which security service of AWS is enabled for all AWS customers, by default, at no additional cost?", "back": "AWS Shield Standard" }
  , { "exam": "CLF-C02", "front": "A startup wants to migrate its data and applications from the on-premises data center to AWS Cloud. Which of the following options can be used by the startup to help with this migration? (Select two)", "back": "Utilize AWS Partner Network (APN) to build a cusomt solution for this infrastructure migration, Leverage AWS Professional Services to accelerate the infrastructure migration" }
  , { "exam": "CLF-C02", "front": "Which of the following statements are CORRECT regarding the Availability Zone (AZ) specific characteristics of Amazon Elastic Block Store (EBS) and Amazon Elastic File System (Amazon EFS) storage types?", "back": "EBS volume can be attached toa. single instance in the same Availability Zone, whereas EFS file system can be mounted on instances across multiple Availability Zones" }
  , { "exam": "CLF-C02", "front": "What are the advantages that AWS Cloud offers over a traditional on-premises IT infrastructure? (Select two)", "back": "Eliminate guessing on your infrastructure capacity needs, Trade capital expense for variable expense" }
  , { "exam": "CLF-C02", "front": "A multi-national company has just moved its infrastructure from its on-premises data center to AWS Cloud. As part of the shared responsibility model, AWS is responsible for which of the following?", "back": "Physical and Environmental controls" }
  , { "exam": "CLF-C02", "front": "Which type of cloud computing does Amazon Elastic Compute Cloud (EC2) represent?", "back": "Infrastructure as a Service (IaaS)" }
  , { "exam": "CLF-C02", "front": "An organization needs to securely access AWS services and establish private connectivity between its Virtual Private Clouds (VPCs) and supported AWS services without using the public internet. Which AWS services can meet this requirement? (Select two)", "back": "AWS PrivateLink, AWS Transit Gateway" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS services has encryption enabled by default?", "back": "AWS CloudTrail Logs" }
  , { "exam": "CLF-C02", "front": "Which of the following is the MOST cost-effective option to purchase an EC2 Reserved Instance (RI)?", "back": "Partial upfront payment option with standard 3-yeras term" }
  , { "exam": "CLF-C02", "front": "Which of the following are correct statements regarding the AWS Global Infrastructure? (Select two)", "back": "Each AWS Region consist of a minimum of three Availability Zones (AZ), Each Availability Zone (AZ) consists of one or more discrete data centers" }
  , { "exam": "CLF-C02", "front": "Which of the following entities applies patches to the underlying OS for Amazon Aurora?", "back": "The AWS product team automatically" }
  , { "exam": "CLF-C02", "front": "A company wants to identify the optimal AWS resource configuration for its workloads so that the company can reduce costs and increase workload performance. Which of the following services can be used to meet this requirement?", "back": "AWS Compute Optimizer" }
  , { "exam": "CLF-C02", "front": "A company needs a storage solution for a project wherein the data is accessed less frequently but needs rapid access when required. Which S3 storage class is the MOST cost-effective for the given use-case?", "back": "Amazon S3 Standard-Infrequent Access (S3 Standard-IA)" }
  , { "exam": "CLF-C02", "front": "Compared to the on-demand instance prices, what is the highest possible discount offered for spot instances?", "back": "90%" }
  , { "exam": "CLF-C02", "front": "The DevOps team at an IT company is moving 500 GB of data from an EC2 instance to an S3 bucket in the same region. Which of the following scenario captures the correct charges for this data transfer?", "back": "The company would not be charged for this data transfer." }
  , { "exam": "CLF-C02", "front": "Under the AWS Shared Responsibility Model, which of the following is a shared responsibility of both AWS and the customer?", "back": "Configuration Management" }
  , { "exam": "CLF-C02", "front": "A startup wants to set up its IT infrastructure on AWS Cloud. The CTO would like to get an estimate of the monthly AWS bill based on the AWS services that the startup wants to use. As a Cloud Practitioner, which AWS service would you suggest for this use-case?", "back": "AWS Pricing Calculator" }
  , { "exam": "CLF-C02", "front": "A company wants to move to AWS cloud and release new features with quick iterations by utilizing relevant AWS services whenever required. Which of the following characteristics of AWS Cloud does it want to leverage?", "back": "Agility" }
  , { "exam": "CLF-C02", "front": "An IT company is planning to migrate from an on-premises environment to AWS Cloud. Which of the following expense areas would result in cost savings when the company moves to AWS Cloud? (Select two)", "back": "Data Center Hardware infrastructure expenditure, Data center physical security expenditure" }
  , { "exam": "CLF-C02", "front": "Which AWS services can be used to decouple components of a microservices based application on AWS Cloud? (Select two)", "back": "SQS, SNS" }
  , { "exam": "CLF-C02", "front": "Which AWS Service can be used to mitigate a Distributed Denial of Service (DDoS) attack?", "back": "AWS Shield" }
  , { "exam": "CLF-C02", "front": "Which of the following are the advantages of cloud computing? (Select three)", "back": "Benefit from massive economies of scale, trade captal expences for variable expense, go global in minutes adnd eploy applications in multiple regions around the world with just a few clicks" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS Support plans provide access to only core checks from the AWS Trusted Advisor Best Practice Checks? (Select two)", "back": "AWS Basic Support, AWS Developer Support" }
  , { "exam": "CLF-C02", "front": "An e-commerce company has deployed an RDS database in a single Availability Zone (AZ). The engineering team wants to ensure that in case of an AZ outage, the database should continue working on the same endpoint without any manual administrative intervention. Which of the following solutions can address this use-case?", "back": "Configure the database in RDS Multi-AZ deployment with automatic failover to the standby" }
  , { "exam": "CLF-C02", "front": "According to the AWS Cloud Adoption Framework (AWS CAF), what are two tasks that a company should perform when planning to migrate to the AWS Cloud and aiming to become more responsive to customer inquiries and feedback as part of their organizational transformation? (Select two)", "back": "Levarage agile methods to rapidly iterate and evolve, Organize your teams around products and value streams" }
  , { "exam": "CLF-C02", "front": "Which AWS Support plan provides architectural guidance contextual to your specific use-cases?", "back": "AWS Business Support" }
  , { "exam": "CLF-C02", "front": "Which AWS service will help you receive alerts when the reservation utilization falls below the defined threshold?", "back": "AWS Budgets" }
  , { "exam": "CLF-C02", "front": "A company runs an application on a fleet of EC2 instances. The company wants to automate the traditional maintenance job of running timely assessments and checking for OS vulnerabilities. As a Cloud Practitioner, which service will you suggest for this use case?", "back": "Amazon Inspector" }
  , { "exam": "CLF-C02", "front": "A medical research startup wants to understand the compliance of AWS services concerning HIPAA guidelines. Which AWS service can be used to review the HIPAA compliance and governance-related documents on AWS?", "back": "AWS Artifact" }
  , { "exam": "CLF-C02", "front": "Which tool/service will help you access AWS services using programming language-specific APIs?", "back": "AWS Software Developer Kti (SDK)" }
  , { "exam": "CLF-C02", "front": "According to the AWS Shared Responsibility Model, which of the following are responsibilities of AWS? (Select two)", "back": "Replacing faulty hardware of Amazon EC2 instances, Operating the infrastructure layer, tjhe operating system and the platform for the Amazon S3 service" }
  , { "exam": "CLF-C02", "front": "A Project Manager, working on AWS for the first time, is confused about how credits are used in AWS. There are two credits available in the manager's account. Credit one is for $100, expires July 2022, and can be used for either Amazon S3 or Amazon EC2. Credit two is for $50, expires December 2022, and can be used only for Amazon EC2. The manager's AWS account has incurred two charges: $1000 for Amazon EC2 and $500 for Amazon S3. What will be the outcome on the overall bill once the credits are used? (Select two)", "back": "Credit one is applied, which expires in july, to the amazon ec2 charge which leaves you with a $900 amazon ec2 charge anda. $500 amazon s3 charge, then credit two is applied to the remaining $900 of Amazon EC2 usage" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS services should be used to automatically distribute incoming traffic across multiple targets?", "back": "AWS Elastic Load Balancing (ELB)" }
  , { "exam": "CLF-C02", "front": "AWS Shield Advanced provides expanded DDoS attack protection for web applications running on which of the following resources? (Select two)", "back": "Amazon Route 53, AWS Global Accelerator" }
  , { "exam": "CLF-C02", "front": "An organization is currently operating MySQL databases on its own on-premises servers. To reduce the operational burden of database maintenance and management, the organization wants to move to a fully managed AWS database offering. Which migration strategy best aligns with this goal?", "back": "Replatform" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS services support VPC Gateway Endpoint for a private connection from a VPC? (Select two)", "back": "Amazon DynamoDB, Amazon S3" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS services support reservations to optimize costs? (Select three)", "back": "Amazon EC2, Amazon RDS, Amazon DynamoDB" }
  , { "exam": "CLF-C02", "front": "A research group wants to use EC2 instances to run a scientific computation application that already has a fault tolerant architecture. The application needs high-performance hardware disks that provide fast I/O performance. As a Cloud Practitioner, which of the following storage options would you recommend as the MOST cost-effective solution?", "back": "Instance Store" }
  , { "exam": "CLF-C02", "front": "A web application stores all of its data on Amazon S3 buckets. A client has mandated that data be encrypted before sending it to Amazon S3. Which of the following is the right technique for encrypting data as needed by the customer?", "back": "Enable client-side encrypyion using AWS encryption SDK" }
  , { "exam": "CLF-C02", "front": "A cyber forensics team has detected that AWS owned IP-addresses are being used to carry out malicious attacks. As this constitutes prohibited use of AWS services, which of the following is the correct solution to address this issue?", "back": "Contact AWS Abuse Team" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS services can be used to connect a company's on-premises environment to a VPC without using the public internet?", "back": "AWS Direct Connect" }
  , { "exam": "CLF-C02", "front": "A company wants to have control over creating and using its own keys for encryption on AWS services. Which of the following can be used for this use-case?", "back": "Customer Managed Key (CMK)" }
  , { "exam": "CLF-C02", "front": "Which of the following statements are CORRECT regarding the AWS VPC service? (Select two)", "back": "A Security Group can have allow rules only, a Network Address Tralsation Gateway (NAT gateway) is managed by AWS" }
  , { "exam": "CLF-C02", "front": "A big data analytics company is moving its IT infrastructure from an on-premises data center to AWS Cloud. The company has some server-bound software licenses that it wants to use on AWS. As a Cloud Practitioner, which of the following EC2 instance types would you recommend to the company?", "back": "Dedicated Host" }
  , { "exam": "CLF-C02", "front": "Which of the following is a recommended way to provide programmatic access to AWS resources?", "back": "Use Access Key ID and. Secret Access Key to access AWS resources programatically" }
  , { "exam": "CLF-C02", "front": "Which of the following is CORRECT regarding removing an AWS account from AWS Organizations?", "back": "The AWS account must be able to operate as a standalone account. Only then it can be removed from AWS Organiations." }
  , { "exam": "CLF-C02", "front": "Which of the following AWS Support plans provide access to guidance, configuration, and troubleshooting of AWS interoperability with third-party software? (Select two)", "back": "AWS Enterprise Support, AWS Business Support" }
  , { "exam": "CLF-C02", "front": "What are the different gateway types supported by AWS Storage Gateway service?", "back": "Tape Gateway, File Gateway and Volume Gateway" }
  , { "exam": "CLF-C02", "front": "The AWS Cloud Adoption Framework (AWS CAF) recommends four iterative and incremental cloud transformation phases. Which cloud transformation journey phase of the AWS Cloud Adoption Framework (AWS CAF) focuses on demonstrating how the cloud will help accelerate your business outcomes?", "back": "Envision" }
  , { "exam": "CLF-C02", "front": "An organization has a complex IT architecture involving a lot of system dependencies and it wants to track the history of changes to each resource. Which AWS service will help the organization track the history of configuration changes for all the resources?", "back": "AWS Config" }
  , { "exam": "CLF-C02", "front": "Which of the following options can be used to access and manage all AWS services (Select three)?", "back": "AWS Software Development Kit (SDK), AWS Command Line Interface (AWS CLI), AWS Management Console" }
  , { "exam": "CLF-C02", "front": "According to the AWS Shared Responsibility Model, which of the following are responsibilities of the customer for Amazon RDS?", "back": "Database encryption" }
  , { "exam": "CLF-C02", "front": "Which of the following solutions can you use to connect your on-premises network with AWS Cloud (Select two)?", "back": "AWS Virtual Private Network (VPN), AWS Direct Connect" }
  , { "exam": "CLF-C02", "front": "The AWS Well-Architected Framework provides guidance on building cloud based applications using AWS best practices. Which of the following options are the pillars mentioned in the AWS Well-Architected Framework? (Select two)", "back": "Cost Optimization, Reliability" }
  , { "exam": "CLF-C02", "front": "As per the AWS Shared Responsibility Model, which of the following is a responsibility of AWS from a security and compliance point of view?", "back": "Edge Location Management" }
  , { "exam": "CLF-C02", "front": "Which of the following foundational capabilities can be found under the Operations Perspective of the AWS Cloud Adoption Framework?", "back": "Performance and capacity management" }
  , { "exam": "CLF-C02", "front": "A leading research firm needs to access information available in old patents and documents (such as PDFs, Text Files, Word documents, etc) present in its huge knowledge base. The firm is looking for a powerful search tool that can dig into these knowledge resources and return the most relevant files/documents. Which of the following is the correct service to address this requirement?", "back": "Amazon Kendra" }
  , { "exam": "CLF-C02", "front": "As per the AWS Shared Responsibility Model, Security and Compliance is a shared responsibility between AWS and the customer. Which of the following security services/utilities falls under the purview of AWS under the AWS Shared Responsibility Model?", "back": "AWS Shield Standard, Advanced you have to sign up for so that counts as customer" }
  , { "exam": "CLF-C02", "front": "Amazon CloudWatch billing metric data is stored in which AWS Region?", "back": "US East (N. Virginia) - us-east-1" }
  , { "exam": "CLF-C02", "front": "Where can EFS instances be accessed from?", "back": "Different AZ, different regions, different VPCs" }
  , { "exam": "CLF-C02", "front": "AWS Identity and Access Management (AWS IAM) policies are written as JSON documents. Which of the following are mandatory elements of an IAM policy?", "back": "Effect, Action" }
  , { "exam": "CLF-C02", "front": "Which feature of AWS Cloud offers the ability to innovate faster and rapidly develop, test and launch software applications?", "back": "Agility" }
  , { "exam": "CLF-C02", "front": "Which budget types can be created under AWS Budgets (Select three)?", "back": "Usage Budget, Cost Budget, Resource Budget" }
  , { "exam": "CLF-C02", "front": "Which AWS services/features support High Availability by default? (Select two)", "back": "Amazon Elastic File System (EFS), Amazon DynamoDB" }
  , { "exam": "CLF-C02", "front": "An e-commerce company uses AWS Cloud and would like to receive separate invoices for development and production environments. As a Cloud Practioner, which of the following solutions would you recommend for this use-case?", "back": "Create separate AWS accounts for development and production environments to receive separate invoices" }
  , { "exam": "CLF-C02", "front": "Which of the following are components of an AWS Site-to-Site VPN? (Select two)", "back": "Customer gateway, Virtual private gateway (VGW)" }
  , { "exam": "CLF-C02", "front": "Which Amazon Simple Storage Service (Amazon S3) storage class offers the lowest availability?", "back": "Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA)" }
  , { "exam": "CLF-C02", "front": "A startup has just moved its IT infrastructure to AWS Cloud. The CTO would like to receive detailed reports that break down the startup's AWS costs by the hour in an Amazon Simple Storage Service (Amazon S3) bucket. As a Cloud Practitioner, which AWS service would you recommend for this use-case?", "back": "AWS Cost & Usage Report (AWS CUR)" }
  , { "exam": "CLF-C02", "front": "What is AWS Cost & Usage Report (AWS CUR)?", "back": "AWS Cost & Usage Report (AWS CUR) contains the most comprehensive set of cost and usage data available. You can use AWS Cost & Usage Report (AWS CUR) to publish your AWS billing reports to an Amazon Simple Storage Service (Amazon S3) bucket that you own. You can receive reports that break down your costs by the hour or month, by product or product resource, or by tags that you define yourself. AWS updates the report in your bucket once a day in comma-separated value (CSV) format." }
  , { "exam": "CLF-C02", "front": "A customer is running a comparative study of pricing models of Amazon EFS and Amazon Elastic Block Store (Amazon EBS) that are used with the Amazon EC2 instances that host the application. Which of the following statements are correct regarding this use-case? (Select two)", "back": "Amazon Elastic Block Store (Amazon EBS) Snapshots are stored incrementally, which means you are billed only for the changed blocks stored, You will pay a fee each time you read from or write data stored on the Amazon Elastic File System (Amazon EFS) - Infrequent Access storage class" }
  , { "exam": "CLF-C02", "front": "Which of the following statements are true about Cost Allocation Tags in AWS Billing? (Select two)", "back": "For each resource, each tag key must be unique, and each tag key can have only one value, You must activate both AWS generated tags and user-defined tags separately before they can appear in Cost Explorer or on a cost allocation report" }
  , { "exam": "CLF-C02", "front": "Which AWS entity enables you to privately connect your Amazon Virtual Private Cloud (Amazon VPC) to an Amazon Simple Queue Service (Amazon SQS) queue?", "back": "VPC Interface Endpoint" }
  , { "exam": "CLF-C02", "front": "An organization maintains a separate Virtual Private Cloud (VPC) for each of its business units. Two units need to privately share data. Which is the most optimal way of privately sharing data between the two VPCs?", "back": "VPC peering connection" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS storage services can be directly used with on-premises systems?", "back": "Amazon Elastic File System (Amazon EFS)" }
  , { "exam": "CLF-C02", "front": "A cargo shipping company runs its server fleet on Amazon Elastic Compute Cloud (Amazon EC2) instances. Some of these instances host the CRM (Customer Relationship Management) applications that need to be accessible 24*7. These applications are not mission-critical. In case of a disaster, these applications can be managed on a lesser number of instances for some time. Which disaster recovery strategy is well-suited as well as cost-effective for this requirement?", "back": "Warm Standby strategy" }
  , { "exam": "CLF-C02", "front": "A multi-national organization has a separate virtual private cloud (VPC) for each of its business units on the AWS Cloud. The organization also wants to connect its on-premises data center with the different virtual private clouds (VPC) for better organization-wide collaboration. Which AWS services can be combined to build the MOST efficient solution for this use-case? (Select two)", "back": "AWS Direct Connect, AWS Transit Gateway" }
  , { "exam": "CLF-C02", "front": "Which pillar of AWS Well-Architected Framework is responsible for making sure that you select the right resource types and sizes based on your workload requirements?", "back": "Performance Efficiency" }
  , { "exam": "CLF-C02", "front": "Bob and Susan each have an AWS account in AWS Organizations. Susan has five Reserved Instances (RIs) of the same type and Bob has none. During one particular hour, Susan uses three instances and Bob uses six for a total of nine instances on the organization's consolidated bill. Which of the following statements are correct about consolidated billing in AWS Organizations? (Select two)", "back": "AWS bills five instances as Reserved Instances, and the remaining four instances as regular instances, Bob receives the cost-benefit from Susan's Reserved Instances (RI) only if he launches his instances in the same Availability Zone (AZ) where Susan purchased her Reserved Instances" }
  , { "exam": "CLF-C02", "front": "The DevOps team at an IT company wants to centrally manage its servers on AWS Cloud as well as on-premise data center so that it can collect software inventory, run commands, configure and patch servers at scale. As a Cloud Practitioner, which AWS service would you recommend for this use-case?", "back": "AWS Systems Manager" }
  , { "exam": "CLF-C02", "front": "A company would like to reserve Amazon Elastic Compute Cloud (Amazon EC2) compute capacity for three years to reduce costs. The company also plans to increase their workloads during this period. As a Cloud Practitioner, which Amazon Elastic Compute Cloud (Amazon EC2) reserved instance (RI) type would you recommend?", "back": "Convertible reserved instance (RI)" }
  , { "exam": "CLF-C02", "front": "According to the AWS Well-Architected Framework, which of the following statements are recommendations in the Operational Excellence pillar? (Select two)", "back": "Anticipate failure, Make frequent, small, reversible changes" }
  , { "exam": "CLF-C02", "front": "Which AWS service can inspect Amazon CloudFront distributions running on any HTTP web server?", "back": "AWS Web Application Firewall (AWS WAF)" }
  , { "exam": "CLF-C02", "front": "A brand-new startup would like to remove its need to manage the underlying infrastructure and focus on the deployment and management of its applications. Which type of cloud computing does this refer to?", "back": "Platform as a Service (PaaS)" }
  , { "exam": "CLF-C02", "front": "An enterprise is planning to move one of its older applications from its local data center to AWS. The IT team wants the fastest migration path and has decided not to update the application code or make any architectural changes. Which migration strategy is the most appropriate for this scenario?", "back": "Rehost" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS Support plans is the MOST cost-effective when getting enhanced technical support by Cloud Support Engineers?", "back": "AWS Business Support" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS Identity and Access Management (AWS IAM) Security Tools allows you to review permissions granted to an IAM user?", "back": "AWS Identity and Access Management (IAM) access advisor" }
  , { "exam": "CLF-C02", "front": "A company needs to use a secure online data transfer tool/service that can automate the ongoing transfers from on-premises systems into AWS while providing support for incremental data backups. Which AWS tool/service is an optimal fit for this requirement?", "back": "AWS DataSync" }
  , { "exam": "CLF-C02", "front": "Which of the following AWS services can be used to generate, use, and manage encryption keys on the AWS Cloud?", "back": "AWS CloudHSM" }
  , { "exam": "CLF-C02", "front": "A team manager needs data about the changes that have taken place for AWS resources in his account during the past two weeks. Which AWS service can help get this data?", "back": "AWS Config" }
  , { "exam": "CLF-C02", "front": "Which of the following statements are correct regarding the AWS Control Tower and Service Control Policies? (Select two)", "back": "Service Control Policies (SCPs) are a type of organization policy that you can use to manage permissions in your organization, AWS Control Tower is an AWS native service providing a pre-defined set of blueprints and guardrails to help customers implement a landing zone for new AWS accounts" }
  , { "exam": "CLF-C02", "front": "As part of a flexible pricing model, AWS offers two types of Savings Plans. Which of the following are the Savings Plans from AWS?", "back": "Compute Savings Plans, EC2 Instance Savings Plans" }
  , { "exam": "CLF-C02", "front": "Which of the following represents the correct scenario where an Auto Scaling group's (ASG) predictive scaling can be effectively used to maintain the required number of AWS resources?", "back": "To manage a workload that exhibits recurring load patterns that are specific to the day of the week or the time of day" }
  , { "exam": "CLF-C02", "front": "Which of the following statements are correct regarding the health monitoring and reporting capabilities supported by AWS Elastic Beanstalk? (Select two)", "back": "The AWS Elastic Beanstalk health monitoring can determine that the environment's Auto Scaling group is available and has a minimum of at least one instance, With basic health reporting, the AWS Elastic Beanstalk service does not publish any metrics to Amazon CloudWatch" }
  , { "exam": "CLF-C02", "front": "AWS Support offers five support plans for its customers. Which of the following features are covered as part of the AWS Basic Support Plan? (Select two)", "back": "Service health checks, One-on-one responses to account and billing questions" }
  , { "exam": "CLF-C02", "front": "AWS Web Application Firewall (AWS WAF) can be deployed on which of the following services?", "back": "Amazon CloudFront, Application Load Balancer, Amazon API Gateway, AWS AppSync" }
  , { "exam": "CLF-C02", "front": "By default, which of the following events are logged by AWS CloudTrail?", "back": "Management events" }
  , { "exam": "CLF-C02", "front": "Which free tool helps to review the state of your workloads and compares them to the latest AWS architectural best practices after you have answered a series of questions about your workload?", "back": "AWS Well-Architected Tool" }
  , { "exam": "CLF-C02", "front": "An organization in the US plans to launch a new product line and needs additional IT infrastructure to support the workload. They want a solution that enables rapid deployment of resources and minimizes setup time. Which advantages of cloud computing can help the organization achieve this goal? (Select two)", "back": "Increase speed and agility, Enable automatic scaling of resources based on demand" }
  , { "exam": "CLF-C02", "front": "Which of the following services/tools offers a user-friendly graphical user interface to manage AWS Snowball devices without a need for command-line interface or REST APIs?", "back": "AWS OpsHub" }
  , { "exam": "SAA-C03", "front": "What is a proper definition of an IAM Role?<ul>"
                                + "<li>IAM Users in multiple User Groups</li>"
                                + "<li>An IAM entity that defines a password policy for IAM Users</li>"
                                + "<li>An IAM entity that defines a set of permissions for making requests to AWS services, and will be used in an AWS service</li>"
                                + "<li>Permissions assigned to IAM Users to perform actions</li></ul>", "back": "<b>An IAM entity that defines a set of permissions for making requests to AWS services, and will be used by an AWS service. Some AWS services need to perform actions on your behalf. To do so, you assign permissions to AWS services with IAM Roles.</b>. Some AWS services need to perform actions on your behalf. To do so, you assign permissions to AWS services with IAM roles." }
  , { "exam": "SAA-C03", "front": "Which of the following is an IAM Security Tool?<ul>"
                                + "<li>IAM Credentials Report</li>"
                                + "<li>IAM Root Account Manager</li>"
                                + "<li>IAM Services Report</li>"
                                + "<li>IAM Security Advisor</li></ul>", "back": "<b>IAM Credentials Report</b> lists all your AWS Account's IAM Users and the status of their various credentials." }
  , { "exam": "SAA-C03", "front": "Which answer is INCORRECT regarding IAM users?<ul>"
                                + "<li>IAM Users can belong to multiple User Groups</li>"
                                + "<li>IAM Users don't have to beling to a User Group</li>"
                                + "<li>IAM Policies can be attached directly to IAM Users</li>"
                                + "<li>IAM Users access AWS services using root account credentials</li></ul>", "back": "<b>IAM Users access AWS services using root account credentials</b>. IAM Users access AWS services using their own credentials (username + password or Access Keys)" }
  , { "exam": "SAA-C03", "front": "Which of the following is an IAM best practice?<ul>"
                                + "<li>Create several IAM Users for one physical person</li>"
                                + "<li>Don't use the root user account</li>"
                                + "<li>Share your AWS account credentials with your colleague, so (s)he can perform a task for you</li>"
                                + "<li>Do not enable MFA for easier access</li></ul>", "back": "<b>Don't use the root user account</b>, use the root account only to create your first IAM user and a few account/service management tasks. For every day dasks, use an IAM user." }
  , { "exam": "SAA-C03", "front": "What are IAM Policies?<ul>"
                                + "<li>A set of policies that define how AWS accounts interact with each other</li>"
                                + "<li>JSON documents that define a set of permissions for making requests to AWS services, and can be used by IAM users, User Groups, and IAM Roles</li>"
                                + "<li>A set of policies that define a password for IAM Users</li>"
                                + "<li>A set of policies defined by AWS that show how customers interact with AWS</li></ul>", "back": "<b>JSON documents that define a set of permissions for making requests to AWS services, and can be used by IAM users, User Groups, and IAM Roles</b>" }
  , { "exam": "SAA-C03", "front": "Which principle should you apply regarding IAM Permissions?<ul>"
                                + "<li>Grant most privilege</li>"
                                + "<li>Grant more permissions if your employee asks you to</li>"
                                + "<li>Grant least privilege</li>"
                                + "<li>Restrict root account permissions</li></ul>", "back": "<b>Grant least privilege</b>" }
  , { "exam": "SAA-C03", "front": "What should you do to increase your root account security?<ul>"
                                + "<li>Remove permissions from the root account</li>"
                                + "<li>Only access AWS services through AWS command line interface (CLI)</li>"
                                + "<li>Don't create IAM Users, only access your AWS account using the root account</li>"
                                + "<li>Enable Multi-Factor Authentication (MFA)</li></ul>", "back": "<b>Enable Multi-Factor Authentication (MFA)</b>" }
  , { "exam": "SAA-C03", "front": "IAM User Groups can contain IAM Users and other User Groups.<ul>"
                                + "<li>True</li>"
                                + "<li>False</li></ul>", "back": "<b>False</b>, IAM User Groups can contain only IAM Users." }
  , { "exam": "SAA-C03", "front": "An IAM policy consists of one or more statements. A statement in an IAM Policy consists of the following, EXCEPT:<ul>"
                                + "<li>Effect</li>"
                                + "<li>Principal</li>"
                                + "<li>Version</li>"
                                + "<li>Action</li>"
                                + "<li>Resource</li></ul>", "back": "<b>Version</b>, A statement in an IAM Policy consists of Sid, Effect, Principal, Action, Resource, and Condition. Version is part of the IAM Policy itself, not the statement." }
  , { "exam": "SAA-C03", "front": "Which EC2 Purchasing Option can provide you the biggest discount, but it is not suitable for critical jobs or databases?<ul>"
                                + "<li>Convertible Reserved Instances</li>"
                                + "<li>Dedicated Hosts</li>"
                                + "<li>Spot Instances</li></ul>", "back": "<b>Spot Instances</b> are good for short workloads and this is the cheapest EC2 Purchasing Option, but they are less reliable because you can lose your EC2 instance. They are up to 90% off regular pricing." }
  , { "exam": "SAA-C03", "front": "What should you use to control traffic in and out of EC2 instances?<ul>"
                                + "<li>Network Access Control List (NACL)</li>"
                                + "<li>Security Groups</li>"
                                + "<li>IAM Policies</li></ul>", "back": "<b>Security Groups</b> operate at the EC2 instance level and can control traffic." }
  , { "exam": "SAA-C03", "front": "How long can you reserve an EC2 Reserved Instance?<ul>"
                                + "<li>1 or 3 years</li>"
                                + "<li>2 or 4 years</li>"
                                + "<li>6 months to 1 year</li>"
                                + "<li>Anytime between 1 and 3 years</li></ul>", "back": "<b>1 or 3 years</b>. EC2 reserved instances can be reserved for 1 or 3 years only." }
  , { "exam": "SAA-C03", "front": "You would like to deploy a High-Performance Computing (HPC) application on EC2 instances. Which EC2 instance type should you choose?<ul>"
                                + "<li>Storage Optimized</li>"
                                + "<li>Compute Optimized</li>"
                                + "<li>Memory Optimized</li>"
                                + "<li>General Purpose</li></ul>", "back": "<b>Compute Optimized</b> EC2 instances are great for compute-intensive workloads requiring high-performance processors (e.g., batch processing, media transcoding, high-performance computing, scientific modeling & machine learning, and dedicated gaming servers)." }
  , { "exam": "SAA-C03", "front": "Which EC2 Purchasing Option should you use for an application you plan to run on a server continuously for 1 year?<ul>"
                                + "<li>Reserved Instances</li>"
                                + "<li>Spot Instances</li>"
                                + "<li>On-Demand Instances</li></ul>", "back": "<b>Reserved Instances</b> are good for long workloads. You can reserve EC2 instances for 1 or 3 years." }
  , { "exam": "SAA-C03", "front": "You are preparing to launch an application that will be hosted on a set of EC2 instances. This application needs some software installation and some OS packages need to be updated during the first launch. What is the best way to achieve this when you launch the EC2 instances?<ul>"
                                + "<li>Connect to each EC2 instance using SSH, then install the required software and update your OS packages manually</li>"
                                + "<li>Write a bash script that installs the required software and updates to your OS, then contact AWS Support and provide them with the script. They will run it on your EC2 instances at launch</li>"
                                + "<li>Write a bash script that installs the required software and updates to your OS, then use this script in EC2 User Data when you launch your EC2 instances</li></ul>", "back": "<b>Write a bash script that installs the required software and updates to your OS, then use this script in EC2 User Data when you launch your EC2 instances</b>. EC2 User Data is used to bootstrap your EC2 instances using a bash script. This script can contain commands such as installing software/packages, download files from the Internet, or anything you want." }
  , { "exam": "SAA-C03", "front": "Which EC2 Instance Type should you choose for a critical application that uses an in-memory database?<ul>"
                                + "<li>Compute Optimized</li>"
                                + "<li>Storage Optimized</li>"
                                + "<li>Memory Optimized</li>"
                                + "<li>General Purpose</li></ul>", "back": "<b>Memory Optimized</b> EC2 instances are great for workloads requiring large data sets in memory." }
  , { "exam": "SAA-C03", "front": "You have an e-commerce application with an OLTP database hosted on-premises. This application has popularity which results in its database has thousands of requests per second. You want to migrate the database to an EC2 instance. Which EC2 Instance Type should you choose to handle this high-frequency OLTP database?<ul>"
                                + "<li>Compute Optimized</li>"
                                + "<li>Storage Optimized</li>"
                                + "<li>Memory Optimized</li>"
                                + "<li>General Purpose</li></ul>", "back": "<b>Storage Optimized</b> EC2 instances are great for workloads requiring high, sequential read/write access to large data sets on local storage." }
  , { "exam": "SAA-C03", "front": "Security Groups can be attached to only one EC2 instance.<ul>"
                                + "<li>False</li>"
                                + "<li>True</li></ul>", "back": "<b>False</b>, Security Groups can be attached to multiple EC2 instances within the same AWS Region/VPC." }
  , { "exam": "SAA-C03", "front": "You're planning to migrate on-premises applications to AWS. Your company has strict compliance requirements that require your applications to run on dedicated servers. You also need to use your own server-bound software license to reduce costs. Which EC2 Purchasing Option is suitable for you?<ul>"
                                + "<li>Convertible Reserved Instances</li>"
                                + "<li>Dedicated Hosts</li>"
                                + "<li>Spot Instances</li></ul>", "back": "<b>Dedicated Hosts</b> are good for companies with strong compliance needs or for software that have complicated licensing models. This is the most expensive EC2 Purchasing Option available." }
  , { "exam": "SAA-C03", "front": "You would like to deploy a database technology on an EC2 instance and the vendor license bills you based on the physical cores and underlying network socket visibility. Which EC2 Purchasing Option allows you to get visibility into them?<ul>"
                                + "<li>Spot Instances</li>"
                                + "<li>On-Demand</li>"
                                + "<li>Dedicated Hosts</li>"
                                + "<li>Reserved Instances</li></ul>", "back": "<b>Dedicated Hosts</b>" }
  , { "exam": "SAA-C03", "front": "Spot Fleet is a set of Spot Instances and optionally ...............<ul>"
                                + "<li>Reserved Instances</li>"
                                + "<li>On-Demand Instances</li>"
                                + "<li>Dedicated Hosts</li>"
                                + "<li>Dedicated Instances</li></ul>", "back": "<b>On-Demand Instances</b> Spot Fleet is a set of Spot Instances and optionally On-demand Instances. It allows you to automatically request Spot Instances with the lowest price." }
  , { "exam": "SAA-C03", "front": "You have launched an EC2 instance that will host a NodeJS application. After installing all the required software and configured your application, you noted down the EC2 instance public IPv4 so you can access it. Then, you stopped and then started your EC2 instance to complete the application configuration. After restart, you can't access the EC2 instance, and you found that the EC2 instance public IPv4 has been changed. What should you do to assign a fixed public IPv4 to your EC2 instance?<ul>"
                                + "<li>Allocate an Elastic IP and assign it to your EC2 instance</li>"
                                + "<li>From inside your EC2 instance OS, change network configuration from DHCP to static and assign it a public IPv4</li>"
                                + "<li>Contact AWS Support and request a fixed public IPv4 to your EC2 instance</li>"
                                + "<li>This can't be done, you can only assign a fixed private IPv4 to your EC2 instance</li></ul>", "back": "<b>Allocate an Elastic IP and assign it to your EC2 instance</b> Elastic IP is a public IPv4 that you own as long as you want and you can attach it to one EC2 instance at a time." }
  , { "exam": "SAA-C03", "front": "You have an application performing big data analysis hosted on a fleet of EC2 instances. You want to ensure your EC2 instances have the highest networking performance while communicating with each other. Which EC2 Placement Group should you choose?<ul>"
                                + "<li>Spread Placement Group</li>"
                                + "<li>Cluster Placement Group</li>"
                                + "<li>Partition Placement Group</li></ul>", "back": "<b>Cluster Placement Groups</b> place your EC2 instances next to each other which gives you high-performance computing and networking." }
  , { "exam": "SAA-C03", "front": "You have a critical application hosted on a fleet of EC2 instances in which you want to achieve maximum availability when there's an AZ failure. Which EC2 Placement Group should you choose?<ul>"
                                + "<li>Cluster Placement Group</li>"
                                + "<li>Partition Placement Group</li>"
                                + "<li>Spread Placement Group</li></ul>", "back": "<b>Spread Placement Group</b> places your EC2 instances on different physical hardware across different AZs." }
  , { "exam": "SAA-C03", "front": "Elastic Network Interface (ENI) can be attached to EC2 instances in another AZ.<ul>"
                                + "<li>True</li>"
                                + "<li>False</li></ul>", "back": "<b>False</b> Elastic Network Interfaces (ENIs) are bounded to a specific AZ. You can not attach an ENI to an EC2 instance in a different AZ." }
  , { "exam": "SAA-C03", "front": "The following are true regarding EC2 Hibernate, EXCEPT:<ul>"
                                + "<li>EC2 Instance Root Volume must be an Instance Store volume</li>"
                                + "<li>Supports On-Demand and Reserved Instances</li>"
                                + "<li>EC2 Instance RAM must be less than 150GB</li>"
                                + "<li>EC2 Instance Root Volume type must be an EBS volume</li></ul>", "back": "<b>EC2 Instance Root Volume must be an Instance Store volume</b> To enable EC2 Hibernate, the EC2 Instance Root Volume type must be an EBS volume and must be encrypted to ensure the protection of sensitive content." }
  , { "exam": "SAA-C03", "front": "You have just terminated an EC2 instance in <code>us-east-1a</code>, and its attached EBS volume is now available. Your teammate tries to attach it to an EC2 instance in <code>us-east-1b</code> but he can't. What is a possible cause for this?<ul>"
                                + "<li>He's missing IAM permissions</li>"
                                + "<li>EBS volumes are locked to an AWS Region</li>"
                                + "<li>EBS volumes are locked to an Availability Zone</li></ul>", "back": "<b>EBS volumes are locked to an Availability Zone</b> EBS Volumes are created for a specific AZ. It is possible to migrate them between different AZs using EBS Snapshots." }
  , { "exam": "SAA-C03", "front": "You have launched an EC2 instance with two EBS volumes, Root volume type and the other EBS volume type to store the data. A month later you are planning to terminate the EC2 instance. What's the default behavior that will happen to each EBS volume?<ul>"
                                + "<li>Both the root volume type and the EBS volume type will be deleted</li>"
                                + "<li>The Root volume type will be deleted and the EBS volume type will not be deleted</li>"
                                + "<li>The root volume type will not be deleted and the EBS volume type will be deleted</li>"
                                + "<li>Both the root volume type and the EBS volume type will not be deleted</li></ul>", "back": "<b>The Root volume type will be deleted and the EBS volume type will not be deleted</b> By default, the Root volume type will be deleted as its 'Delete On Termination' attribute checked by default. Any other EBS volume types will not be deleted as its 'Delete On Termination' attribute disabled by default." }
  , { "exam": "SAA-C03", "front": "You can use an AMI in N.Virginia Region us-east-1 to launch an EC2 instance in any AWS Region.<ul>"
                                + "<li>True</li>"
                                + "<li>False</li></ul>", "back": "<b>False</b> AMIs are built for a specific AWS Region, they're unique for each AWS Region. You can't launch an EC2 instance using an AMI in another AWS Region, but you can copy the AMI to the target AWS Region and then use it to create your EC2 instances." }
  , { "exam": "SAA-C03", "front": "Which of the following EBS volume types can be used as boot volumes when you create EC2 instances?<ul>"
                                + "<li>gp2, gp3, st1, sc1</li>"
                                + "<li>gp2, gp3, io1, io2</li>"
                                + "<li>io1, io2, st1, sc1</li></ul>", "back": "<b>gp2, gp3, io1, io2</b> When creating EC2 instances, you can only use the following EBS volume types as boot volumes: gp2, gp3, io1, io2, and Magnetic (Standard)." }
  , { "exam": "SAA-C03", "front": "What is EBS Multi-Attach?<ul>"
                                + "<li>Attach the same EBS volume to multiple EC2 instances in multiple AZs</li>"
                                + "<li>Attach multiple EBS volumes in the same AZ to the same EC2 instance</li>"
                                + "<li>Attach the same EBS volume to multiple EC2 instances in the same AZ</li>"
                                + "<li>Attach multiple EBS volumes in multiple AZs to the same EC2 instance</li></ul>", "back": "<b>Attach the same EBS volume to multiple EC2 instances in the same AZ</b> Using EBS Multi-Attach, you can attach the same EBS volume to multiple EC2 instances in the same AZ. Each EC2 instance has full read/write permissions." }
  , { "exam": "SAA-C03", "front": "You would like to encrypt an unencrypted EBS volume attached to your EC2 instance. What should you do?<ul>"
                                + "<li>Create an EBS snapshot of your EBS volume. Copy the snapshot and tick the option to encrypt the copied snapshot. Then, use the encrypted snapshot to create a new EBS volume</li>"
                                + "<li>Select your EBS volume, choose Edit Attributes, then tick the Encrypt using KMS option</li>"
                                + "<li>Create a new encrypted EBS volume, then copy data from your unencrypted EBS volume to the new EBS volume.</li>"
                                + "<li>Submit a request to AWS Support to encrypt your EBS volume</li></ul>", "back": "<b>Create an EBS snapshot of your EBS volume. Copy the snapshot and tick the option to encrypt the copied snapshot. Then, use the encrypted snapshot to create a new EBS volume</b>" }
  , { "exam": "SAA-C03", "front": "You have a fleet of EC2 instances distributes across AZs that process a large data set. What do you recommend to make the same data to be accessible as an NFS drive to all of your EC2 instances?<ul>"
                                + "<li>Use EBS</li>"
                                + "<li>Use EFS</li>"
                                + "<li>Use an Instance Store</li></ul>", "back": "<b>Use EFS</b> EFS is a network file system (NFS) that allows you to mount the same file system on EC2 instances that are in different AZs." }
  , { "exam": "SAA-C03", "front": "You would like to have a high-performance local cache for your application hosted on an EC2 instance. You don't mind losing the cache upon the termination of your EC2 instance. Which storage mechanism do you recommend as a Solutions Architect?<ul>"
                                + "<li>EBS</li>"
                                + "<li>EFS</li>"
                                + "<li>Instance Store</li></ul>", "back": "<b>Instance Store</b> EC2 Instance Store provides the best disk I/O performance." }
  , { "exam": "SAA-C03", "front": "You are running a high-performance database that requires an IOPS of 310,000 for its underlying storage. What do you recommend?<ul>"
                                + "<li>Use an EBS gp2 drive</li>"
                                + "<li>Use an EBS io1 drive</li>"
                                + "<li>Use an EC2 Instance Store</li>"
                                + "<li>Use an EBS io2 Block Express drive</li></ul>", "back": "<b>Use an EC2 Instance Store</b> You can run a database on an EC2 instance that uses an Instance Store, but you'll have a problem that the data will be lost if the EC2 instance is stopped (it can be restarted without problems). One solution is that you can set up a replication mechanism on another EC2 instance with an Instance Store to have a standby copy. Another solution is to set up backup mechanisms for your data. It's all up to you how you want to set up your architecture to validate your requirements. In this use case, it's around IOPS, so we have to choose an EC2 Instance Store." }
  , { "exam": "SAA-C03", "front": "Scaling an EC2 instance from r4.large to r4.4xlarge is called .....................<ul>"
                                + "<li>Horizontal Scalability</li>"
                                + "<li>Vertical Scalability</li></ul>", "back": "<b>Vertical Scalability</b>" }
  , { "exam": "SAA-C03", "front": "Running an application on an Auto Scaling Group that scales the number of EC2 instances in and out is called .....................<ul>"
                                + "<li>Horizontal Scalability</li>"
                                + "<li>Vertical Scalability</li></ul>", "back": "<b>Horizontal Scalability</b>" }
  , { "exam": "SAA-C03", "front": "Elastic Load Balancers provide a .......................<ul>"
                                + "<li>static IPv4 we can use in our application</li>"
                                + "<li>static DNS name we can use in our application</li>"
                                + "<li>static IPv6 we can use in our application</li></ul>", "back": "<b>static DNS name we can use in our application</b> Only Network Load Balancer provides both static DNS name and static IP. While, Application Load Balancer provides a static DNS name but it does NOT provide a static IP. The reason being that AWS wants your Elastic Load Balancer to be accessible using a static endpoint, even if the underlying infrastructure that AWS manages changes." }
  , { "exam": "SAA-C03", "front": "You are running a website on 10 EC2 instances fronted by an Elastic Load Balancer. Your users are complaining about the fact that the website always asks them to re-authenticate when they are moving between website pages. You are puzzled because it's working just fine on your machine and in the Dev environment with 1 EC2 instance. What could be the reason?<ul>"
                                + "<li>Your website must have an issue when hosted on multiple EC2 instances</li>"
                                + "<li>The EC2 instances log out users as they can't see their IP addresses, instead, they receive ELB IP addresses.</li>"
                                + "<li>The Elastic Load Balancer does not have Sticky Sessions enabled</li></ul>", "back": "<b>The Elastic Load Balancer does not have Sticky Sessions enabled</b> ELB Sticky Session feature ensures traffic for the same client is always redirected to the same target (e.g., EC2 instance). This helps that the client does not lose his session data." }
  , { "exam": "SAA-C03", "front": "You are using an Application Load Balancer to distribute traffic to your website hosted on EC2 instances. It turns out that your website only sees traffic coming from private IPv4 addresses which are in fact your Application Load Balancer's IP addresses. What should you do to get the IP address of clients connected to your website?<ul>"
                                + "<li>Modify your website's frontend so that users send their IP in every request</li>"
                                + "<li>Modify your website's backend to get the client IP address from the X-Forwarded-For header</li>"
                                + "<li>Modify your website's backend to get the client IP address from the X-Forwarded-Port header</li>"
                                + "<li>Modify your website's backend to get the client IP address from the X-Forwarded-Proto header</li></ul>", "back": "<b>Modify your website's backend to get the client IP address from the X-Forwarded-For header</b> When using an Application Load Balancer to distribute traffic to your EC2 instances, the IP address you'll receive requests from will be the ALB's private IP addresses. To get the client's IP address, ALB adds an additional header called 'X-Forwarded-For' contains the client's IP address." }
  , { "exam": "SAA-C03", "front": "You hosted an application on a set of EC2 instances fronted by an Elastic Load Balancer. A week later, users begin complaining that sometimes the application just doesn't work. You investigate the issue and found that some EC2 instances crash from time to time. What should you do to protect users from connecting to the EC2 instances that are crashing?<ul>"
                                + "<li>Enable ELB Health Checks</li>"
                                + "<li>Enable ELB Stickiness</li>"
                                + "<li>Enable SSL Termination</li>"
                                + "<li>Enable Cross-Zone Load Balancing</li></ul>", "back": "<b>Enable ELB Health Checks</b> When you enable ELB Health Checks, your ELB won't send traffic to unhealthy (crashed) EC2 instances." }
  , { "exam": "SAA-C03", "front": "You are working as a Solutions Architect for a company and you are required to design an architecture for a high-performance, low-latency application that will receive millions of requests per second. Which type of Elastic Load Balancer should you choose?<ul>"
                                + "<li>Application Load Balancer</li>"
                                + "<li>Network Load Balancer</li></ul>", "back": "<b>Network Load Balancer</b> provides the highest performance and lowest latency if your application needs it." }
  , { "exam": "SAA-C03", "front": "Application Load Balancers support the following protocols, EXCEPT:<ul>"
                                + "<li>HTTP</li>"
                                + "<li>HTTPS</li>"
                                + "<li>TCP</li>"
                                + "<li>WebSocket</li></ul>", "back": "<b>TCP</b> Application Load Balancers support HTTP, HTTPS and WebSocket" }
  , { "exam": "SAA-C03", "front": "Application Load Balancers can route traffic to different Target Groups based on the following, EXCEPT:<ul>"
                                + "<li>Client's Location (Geography)</li>"
                                + "<li>Hostname</li>"
                                + "<li>Request URL Path</li>"
                                + "<li>Source IP Address</li></ul>", "back": "<b>Client's Location (Geography)</b> ALBs can route traffic to different Target Groups based on URL Path, Hostname, HTTP Headers, and Query Strings." }
  , { "exam": "SAA-C03", "front": "Registered targets in a Target Groups for an Application Load Balancer can be one of the following, EXCEPT:<ul>"
                                + "<li>EC2 Instances</li>"
                                + "<li>Network Load Balancer</li>"
                                + "<li>Private IP Addresses</li>"
                                + "<li>Lambda Functions</li></ul>", "back": "<b>Network Load Balancer</b> " }
  , { "exam": "SAA-C03", "front": "For compliance purposes, you would like to expose a fixed static IP address to your end-users so that they can write firewall rules that will be stable and approved by regulators. What type of Elastic Load Balancer would you choose?<ul>"
                                + "<li>Application Load Balancer with an Elastic IP attached to it</li>"
                                + "<li>Network Load Balancer</li></ul>", "back": "<b>Network Load Balancer</b> Network Load Balancer has one static IP address per AZ and you can attach an Elastic IP address to it. Application Load Balancers and Classic Load Balancers have a static DNS name." }
  , { "exam": "SAA-C03", "front": "You want to create a custom application-based cookie in your Application Load Balancer. Which of the following you can use as a cookie name?<ul>"
                                + "<li>AWSALBAPP</li>"
                                + "<li>APPUSERC</li>"
                                + "<li>AWSALBTG</li>"
                                + "<li>AWSALB</li></ul>", "back": "<b>APPUSERC</b> The following cookie names are reserved by the ELB (AWSALB, AWSALBAPP, AWSALBTG)." }
  , { "exam": "SAA-C03", "front": "You have a Network Load Balancer that distributes traffic across a set of EC2 instances in us-east-1. You have 2 EC2 instances in us-east-1b AZ and 5 EC2 instances in us-east-1e AZ. You have noticed that the CPU utilization is higher in the EC2 instances in us-east-1b AZ. After more investigation, you noticed that the traffic is equally distributed across the two AZs. How would you solve this problem?<ul>"
                                + "<li>Enable Cross-Zone Load Balancing</li>"
                                + "<li>Enable Sticky Sessions</li>"
                                + "<li>Enable ELB Health Checks</li>"
                                + "<li>Enable SSL Termination</li></ul>", "back": "<b>Enable Cross-Zone Load Balancing</b> When Cross-Zone Load Balancing is enabled, ELB distributes traffic evenly across all registered EC2 instances in all AZs." }
];

/*
copy(`  , { "exam": "SAA-C03", "front": "${document.querySelector('#question-prompt').innerText}<ul>"\n                                + "<li>${Array.from(document.querySelectorAll('[aria-labelledby="question-prompt"] .ud-heading-md>div>div>div[data-purpose="safely-set-inner-html:rich-text-viewer:html"]')).map(x=>x.innerText).join('</li>"\n                                + "<li>')}</li></ul>", "back": "<b>${document.querySelector('.ud-text-xs').parentElement.parentElement.firstElementChild.innerText}</b> ${document.querySelector('[aria-labelledby="question-prompt"] .ud-heading-md .ud-text-sm div').innerText}" }\n`)
copy(document.querySelector('[aria-labelledby="question-prompt"] .ud-heading-md .ud-text-sm div').innerText)
<ul>"
                                + "<li></li>"
                                + "<li></li>"
                                + "<li></li>"
                                + "<li></li></ul>
<ul>"
                                + "<li></li>"
                                + "<li></li>"
                                + "<li></li>"
                                + "<li></li>"
                                + "<li></li></ul>
<ul>"
                                + "<li></li>"
                                + "<li></li>"
                                + "<li></li>"
                                + "<li></li>"
                                + "<li></li>"
                                + "<li></li></ul>
  , { "exam": "SAA-C03", "front": "", "back": "" }
*/