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
  , { "exam": "SAA-C03", "front": "Which feature in both Application Load Balancers and Network Load Balancers allows you to load multiple SSL certificates on one listener?<ul>"
                                + "<li>TLS Termination</li>"
                                + "<li>Server Name Indication (SNI)</li>"
                                + "<li>SSL Security Policies</li>"
                                + "<li>Host Headers</li></ul>", "back": "<b>Server Name Indication (SNI)</b> " }
  , { "exam": "SAA-C03", "front": "You have an Application Load Balancer that is configured to redirect traffic to 3 Target Groups based on the following hostnames: users.example.com, api.external.example.com, and checkout.example.com. You would like to configure HTTPS for each of these hostnames. How do you configure the ALB to make this work?<ul>"
                                + "<li>Use an HTTP to HTTPS redirect rule</li>"
                                + "<li>Use a security group SSL certificate</li>"
                                + "<li>Use Server Name Indication (SNI)</li></ul>", "back": "<b>Use Server Name Indication (SNI)</b> Server Name Indication (SNI) allows you to expose multiple HTTPS applications each with its own SSL certificate on the same listener. Read more here: https://aws.amazon.com/blogs/aws/new-application-load-balancer-sni/" }
  , { "exam": "SAA-C03", "front": "You have an application hosted on a set of EC2 instances managed by an Auto Scaling Group that you configured both desired and maximum capacity to 3. Also, you have created a CloudWatch Alarm that is configured to scale out your ASG when CPU Utilization reaches 60%. Your application suddenly received huge traffic and is now running at 80% CPU Utilization. What will happen?<ul>"
                                + "<li>Nothing</li>"
                                + "<li>The desired capacity will go up to 4 and the maximum capacity will stay at 3</li>"
                                + "<li>The desired capacity will go up to 4 and the maximum capacity will stay at 4</li></ul>", "back": "<b>Nothing</b> The Auto Scaling Group can't go over the maximum capacity (you configured) during scale-out events." }
  , { "exam": "SAA-C03", "front": "You have an Auto Scaling Group fronted by an Application Load Balancer. You have configured the ASG to use ALB Health Checks, then one EC2 instance has just been reported unhealthy. What will happen to the EC2 instance?<ul>"
                                + "<li>The ASG will keep the instance running and re-start the application</li>"
                                + "<li>The ASG will detach the EC2 instance and leave it running</li>"
                                + "<li>The ASG will terminate the EC2 instance</li></ul>", "back": "<b>The ASG will terminate the EC2 instance</b> You can configure the Auto Scaling Group to determine the EC2 instances' health based on Application Load Balancer Health Checks instead of EC2 Status Checks (default). When an EC2 instance fails the ALB Health Checks, it is marked unhealthy and will be terminated while the ASG launches a new EC2 instance." }
  , { "exam": "SAA-C03", "front": "Your boss asked you to scale your Auto Scaling Group based on the number of requests per minute your application makes to your database. What should you do?<ul>"
                                + "<li>Create a CloudWatch custom metric then create a CloudWatch Alarm on this metric to scale your ASG</li>"
                                + "<li>You politely tell him it's impossible</li>"
                                + "<li>Enable Detailed Monitoring then create a CloudWatch Alarm to scale your ASG</li></ul>", "back": "<b>Create a CloudWatch custom metric then create a CloudWatch Alarm on this metric to scale your ASG</b> There's no CloudWatch Metric for 'requests per minute' for backend-to-database connections. You need to create a CloudWatch Custom Metric, then create a CloudWatch Alarm." }
  , { "exam": "SAA-C03", "front": "An application is deployed with an Application Load Balancer and an Auto Scaling Group. Currently, you manually scale the ASG and you would like to define a Scaling Policy that will ensure the average number of connections to your EC2 instances is around 1000. Which Scaling Policy should you use?<ul>"
                                + "<li>Simple Scaling Policy</li>"
                                + "<li>Step Scaling Policy</li>"
                                + "<li>Target Tracking Policy</li>"
                                + "<li>Scheduled Scaling Policy</li></ul>", "back": "<b>Target Tracking Policy</b> " }
  , { "exam": "SAA-C03", "front": "You have an ASG and a Network Load Balancer. The application on your ASG supports the HTTP protocol and is integrated with the Load Balancer health checks. You are currently using the TCP health checks. You would like to migrate to using HTTP health checks, what do you do?<ul>"
                                + "<li>Migrate to an Application Load Balancer</li>"
                                + "<li>Migrate the health check to HTTP</li></ul>", "back": "<b>Migrate the health check to HTTP</b> the NLB supports HTTP health checks as well as TCP and HTTPS" }
  , { "exam": "SAA-C03", "front": "You have a website hosted in EC2 instances in an Auto Scaling Group fronted by an Application Load Balancer. Currently, the website is served over HTTP, and you have been tasked to configure it to use HTTPS. You have created a certificate in ACM and attached it to the Application Load Balancer. What you can do to force users to access the website using HTTPS instead of HTTP?<ul>"
                                + "<li>Send an email to all customers to use HTTPS instead of HTTP</li>"
                                + "<li>Configure the Application Load Balancer to redirect HTTP to HTTPS</li>"
                                + "<li>Configure the DNS record to redirect HTTP to HTTPS</li></ul>", "back": "<b>Configure the Application Load Balancer to redirect HTTP to HTTPS</b> " }
  , { "exam": "SAA-C03", "front": "Amazon RDS supports the following databases, EXCEPT:<ul>"
                                + "<li>MongoDB</li>"
                                + "<li>MySQL</li>"
                                + "<li>MariaDB</li>"
                                + "<li>Microsoft SQL Server</li></ul>", "back": "<b>MongoDB</b> RDS supports MySQL, PostgreSQL, MariaDB, Oracle, MS SQL Server, and Amazon Aurora." }
  , { "exam": "SAA-C03", "front": "You're planning for a new solution that requires a MySQL database that must be available even in case of a disaster in one of the Availability Zones. What should you use?<ul>"
                                + "<li>Create Read Replicas</li>"
                                + "<li>Enable Encryption</li>"
                                + "<li>Enable Multi-AZ</li></ul>", "back": "<b>Enable Multi-AZ</b> Multi-AZ helps when you plan a disaster recovery for an entire AZ going down. If you plan against an entire AWS Region going down, you should use backups and replication across AWS Regions." }
  , { "exam": "SAA-C03", "front": "We have an RDS database that struggles to keep up with the demand of requests from our website. Our million users mostly read news, and we don't post news very often. Which solution is NOT adapted to this problem?<ul>"
                                + "<li>An ElastiCache Cluster</li>"
                                + "<li>RDS Multi-AZ</li>"
                                + "<li>RDS Read Replicas</li></ul>", "back": "<b>RDS Multi-AZ</b> Be very careful with the way you read questions at the exam. Here, the question is asking which solution is NOT adapted to this problem. ElastiCache and RDS Read Replicas do indeed help with scaling reads." }
  , { "exam": "SAA-C03", "front": "You have set up read replicas on your RDS database, but users are complaining that upon updating their social media posts, they do not see their updated posts right away. What is a possible cause for this?<ul>"
                                + "<li>There must be a bug in your application</li>"
                                + "<li>Read Replicas have Asynchronous Replication, therefore it's likely your users will only read Eventual Consistency</li>"
                                + "<li>You should have setup Multi-AZ instead</li></ul>", "back": "<b>Read Replicas have Asynchronous Replication, therefore it's likely your users will only read Eventual Consistency</b> " }
  , { "exam": "SAA-C03", "front": "Which RDS (NOT Aurora) feature when used does not require you to change the SQL connection string?<ul>"
                                + "<li>Multi-AZ</li>"
                                + "<li>Read Replicas</li></ul>", "back": "<b>Multi-AZ</b> Multi-AZ keeps the same connection string regardless of which database is up." }
  , { "exam": "SAA-C03", "front": "Your application running on a fleet of EC2 instances managed by an Auto Scaling Group behind an Application Load Balancer. Users have to constantly log back in and you don't want to enable Sticky Sessions on your ALB as you fear it will overload some EC2 instances. What should you do?<ul>"
                                + "<li>Use your own custom Load Balancer on EC2 instances instead of using ALB</li>"
                                + "<li>Store session data in RDS</li>"
                                + "<li>Store session data in ElastiCache</li>"
                                + "<li>Store session data in a shared EBS volume</li></ul>", "back": "<b>Store session data in ElastiCache</b> Storing Session Data in ElastiCache is a common pattern to ensuring different EC2 instances can retrieve your user's state if needed." }
  , { "exam": "SAA-C03", "front": "An analytics application is currently performing its queries against your main production RDS database. These queries run at any time of the day and slow down the RDS database which impacts your users' experience. What should you do to improve the users' experience?<ul>"
                                + "<li>Setup a Read Replica</li>"
                                + "<li>Setup Multi-AZ</li>"
                                + "<li>Run the analytics queries at night</li></ul>", "back": "<b>Setup a Read Replica</b> Read Replicas will help as your analytics application can now perform queries against it, and these queries won't impact the main production RDS database." }
  , { "exam": "SAA-C03", "front": "You would like to ensure you have a replica of your database available in another AWS Region if a disaster happens to your main AWS Region. Which database do you recommend to implement this easily?<ul>"
                                + "<li>RDS Read Replicas</li>"
                                + "<li>RDS Multi-AZ</li>"
                                + "<li>Aurora Read Replicas</li>"
                                + "<li>Aurora Global Database</li></ul>", "back": "<b>Aurora Global Database</b> Aurora Global Databases allows you to have an Aurora Replica in another AWS Region, with up to 5 secondary regions." }
  , { "exam": "SAA-C03", "front": "How can you enhance the security of your ElastiCache Redis Cluster by allowing users to access your ElastiCache Redis Cluster using their IAM Identities (e.g., Users, Roles)?<ul>"
                                + "<li>Using Redis Authentication</li>"
                                + "<li>Using IAM Authentication</li>"
                                + "<li>Use Security Groups</li></ul>", "back": "<b>Using IAM Authentication</b> " }
  , { "exam": "SAA-C03", "front": "Your company has a production Node.js application that is using RDS MySQL 5.6 as its database. A new application programmed in Java will perform some heavy analytics workload to create a dashboard on a regular hourly basis. What is the most cost-effective solution you can implement to minimize disruption for the main application?<ul>"
                                + "<li>Enable Multi-AZ for the RDS database and run the analytics workload on the standby database</li>"
                                + "<li>Create a Read Replica in a different AZ and run the analytics workload on the replica database</li>"
                                + "<li>Create a Read Replica in a different AZ and run the analytics workload on the source database</li></ul>", "back": "<b>Create a Read Replica in a different AZ and run the analytics workload on the replica database</b> " }
  , { "exam": "SAA-C03", "front": "You would like to create a disaster recovery strategy for your RDS PostgreSQL database so that in case of a regional outage the database can be quickly made available for both read and write workloads in another AWS Region. The DR database must be highly available. What do you recommend?<ul>"
                                + "<li>Create a Read Replica in the same region and enable Multi-AZ on the main database</li>"
                                + "<li>Create a Read Replica in a different region and enable Multi-AZ on the Read Replica</li>"
                                + "<li>Create a Read Replica in the same region and enable Multi-AZ on the Read Replica</li>"
                                + "<li>Enable Multi-Region option on the main database</li></ul>", "back": "<b>Create a Read Replica in a different region and enable Multi-AZ on the Read Replica</b> " }
  , { "exam": "SAA-C03", "front": "You have migrated the MySQL database from on-premises to RDS. You have a lot of applications and developers interacting with your database. Each developer has an IAM user in the company's AWS account. What is a suitable approach to give access to developers to the MySQL RDS DB instance instead of creating a DB user for each one?<ul>"
                                + "<li>By default IAM users have access to your RDS database</li>"
                                + "<li>Use Amazon Cognito</li>"
                                + "<li>Enable IAM Database Authentication</li></ul>", "back": "<b>Enable IAM Database Authentication</b> " }
  , { "exam": "SAA-C03", "front": "Which of the following statement is true regarding replication in both RDS Read Replicas and Multi-AZ?<ul>"
                                + "<li>Read Replica uses Asynchronous Replication and Multi-AZ uses Asynchronous Replication</li>"
                                + "<li>Read Replica uses Asynchronous Replication and Multi-AZ uses Synchronous Replication</li>"
                                + "<li>Read Replica uses Synchronous Replication and Multi-AZ uses Synchronous Replication</li>"
                                + "<li>Read Replica uses Synchronous Replication and Multi-AZ uses Asynchronous Replication</li></ul>", "back": "<b>Read Replica uses Asynchronous Replication and Multi-AZ uses Synchronous Replication</b> " }
  , { "exam": "SAA-C03", "front": "How do you encrypt an unencrypted RDS DB instance?<ul>"
                                + "<li>Do it straight from AWS Console, select your RDS DB instance, choose Actions then Encrypt using KMS</li>"
                                + "<li>Do it straight from AWS Console, after stopping the RDS DB instance</li>"
                                + "<li>Create a snapshot of the unencrypted RDS DB instance, copy the snapshot and tick 'Enable encryption', then restore the RDS DB instance from the encrypted snapshot</li></ul>", "back": "<b>Create a snapshot of the unencrypted RDS DB instance, copy the snapshot and tick 'Enable encryption', then restore the RDS DB instance from the encrypted snapshot</b> " }
  , { "exam": "SAA-C03", "front": "For your RDS database, you can have up to ............ Read Replicas.<ul>"
                                + "<li>5</li>"
                                + "<li>15</li>"
                                + "<li>7</li></ul>", "back": "<b>15</b>. Think base 16 hex, like 16 databases total kinda thing." }
  , { "exam": "SAA-C03", "front": "Which RDS database technology does NOT support IAM Database Authentication?<ul>"
                                + "<li>Oracle</li>"
                                + "<li>PostgreSQL</li>"
                                + "<li>MySQL</li></ul>", "back": "<b>Oracle</b> " }
  , { "exam": "SAA-C03", "front": "You have an un-encrypted RDS DB instance and you want to create Read Replicas. Can you configure the RDS Read Replicas to be encrypted?<ul>"
                                + "<li>No</li>"
                                + "<li>Yes</li></ul>", "back": "<b>No</b> You can not create encrypted Read Replicas from an unencrypted RDS DB instance." }
  , { "exam": "SAA-C03", "front": "An application running in production is using an Aurora Cluster as its database. Your development team would like to run a version of the application in a scaled-down application with the ability to perform some heavy workload on a need-basis. Most of the time, the application will be unused. Your CIO has tasked you with helping the team to achieve this while minimizing costs. What do you suggest?<ul>"
                                + "<li>Use an Aurora Global Database</li>"
                                + "<li>Use an RDS database</li>"
                                + "<li>Use Aurora Serverless</li>"
                                + "<li>Run Aurora on EC2, and write a script to shut down the EC2 instance at night</li></ul>", "back": "<b>Use Aurora Serverless</b> " }
  , { "exam": "SAA-C03", "front": "How many Aurora Read Replicas can you have in a single Aurora DB Cluster?<ul>"
                                + "<li>5</li>"
                                + "<li>10</li>"
                                + "<li>15</li></ul>", "back": "<b>15</b>. Think base 16 hex, like 16 databases total kinda thing." }
  , { "exam": "SAA-C03", "front": "Amazon Aurora supports both .......................... databases.<ul>"
                                + "<li>MySQL and MariaDB</li>"
                                + "<li>MySQL and PostgreSQL</li>"
                                + "<li>Oracle and MariaDB</li>"
                                + "<li>Oracle and MS SQL Server</li></ul>", "back": "<b>MySQL and PostgreSQL</b> " }
  , { "exam": "SAA-C03", "front": "You work as a Solutions Architect for a gaming company. One of the games mandates that players are ranked in real-time based on their score. Your boss asked you to design then implement an effective and highly available solution to create a gaming leaderboard. What should you use?<ul>"
                                + "<li>Use RDS for MySQL</li>"
                                + "<li>Use an Amazon Aurora</li>"
                                + "<li>Use ElastiCache for Memcached</li>"
                                + "<li>Use ElastiCache for Redis - Sorted Sets</li></ul>", "back": "<b>Use ElastiCache for Redis - Sorted Sets</b> " }
  , { "exam": "SAA-C03", "front": "You need full customization of an Oracle Database on AWS. You would like to benefit from using the AWS services. What do you recommend? <ul>"
                                + "<li>RDS for Oracle</li>"
                                + "<li>RDS Custom for Oracle</li>"
                                + "<li>Deploy Oracle on EC2</li></ul>", "back": "<b>RDS Custom for Oracle</b> " }
  , { "exam": "SAA-C03", "front": "You need to store long-term backups for your Aurora database for disaster recovery and audit purposes. What do you recommend?<ul>"
                                + "<li>Enable Automated Backups</li>"
                                + "<li>Perform On Demand Backups</li>"
                                + "<li>Use Aurora Database Cloning</li></ul>", "back": "<b>Perform On Demand Backups</b>, because automated backups can only be kept for 35 days." }
  , { "exam": "SAA-C03", "front": "Your development team would like to perform a suite of read and write tests against your production Aurora database because they need access to production data as soon as possible. What do you advise?<ul>"
                                + "<li>Create an Aurora Read Replica for them</li>"
                                + "<li>Do the test against the production database</li>"
                                + "<li>Make a DB Snapshot and Restore it into a new database</li>"
                                + "<li>Use the Aurora Cloning feature</li></ul>", "back": "<b>Use the Aurora Cloning feature</b>, which is faster than making a DB snapshot and restoring it into a new database." }
  , { "exam": "SAA-C03", "front": "You have 100 EC2 instances connected to your RDS database and you see that upon a maintenance of the database, all your applications take a lot of time to reconnect to RDS, due to poor application logic. How do you improve this? <ul>"
                                + "<li>Fix all the applications</li>"
                                + "<li>Disable Multi-AZ </li>"
                                + "<li>Enable Multi-AZ</li>"
                                + "<li>Use an RDS Proxy</li></ul>", "back": "<b>Use an RDS Proxy</b> This reduces the failover time by up to 66% and keeps connection actives for your applications" }
  , { "exam": "SAA-C03", "front": "You have purchased mycoolcompany.com on Amazon Route 53 Registrar and would like the domain to point to your Elastic Load Balancer my-elb-1234567890.us-west-2.elb.amazonaws.com. Which Route 53 Record type must you use here?<ul>"
                                + "<li>CNAME</li>"
                                + "<li>Alias</li></ul>", "back": "<b>Alias</b>, because you can't use a CNAME as the top level, notice there's no 'www' in the question" }
  , { "exam": "SAA-C03", "front": "You have deployed a new Elastic Beanstalk environment and would like to direct 5% of your production traffic to this new environment. This allows you to monitor for CloudWatch metrics and ensuring that there're no bugs exist with your new environment. Which Route 53 Routing Policy allows you to do so?<ul>"
                                + "<li>Simple</li>"
                                + "<li>Weighted</li>"
                                + "<li>Latency</li>"
                                + "<li>Failover</li></ul>", "back": "<b>Weighted</b> Weighted Routing Policy allows you to redirect part of the traffic based on weight (e.g., percentage). It's a common use case to send part of traffic to a new version of your application." }
  , { "exam": "SAA-C03", "front": "You have updated a Route 53 Record's myapp.mydomain.com value to point to a new Elastic Load Balancer, but it looks like users are still redirected to the old ELB. What is a possible cause for this behavior?<ul>"
                                + "<li>Because of the Alias record</li>"
                                + "<li>Because of the CNAME record</li>"
                                + "<li>Because of the TTL</li>"
                                + "<li>Because of Route 53 Health Checks</li></ul>", "back": "<b>Because of the TTL</b> Each DNS record has a TTL (Time To Live) which orders clients for how long to cache these values and not overload the DNS Resolver with DNS requests. The TTL value should be set to strike a balance between how long the value should be cached vs. how many requests should go to the DNS Resolver." }
  , { "exam": "SAA-C03", "front": "You have an application that's hosted in two different AWS Regions us-west-1 and eu-west-2. You want your users to get the best possible user experience by minimizing the response time from application servers to your users. Which Route 53 Routing Policy should you choose?<ul>"
                                + "<li>Multi Value</li>"
                                + "<li>Weighted</li>"
                                + "<li>Latency</li>"
                                + "<li>Geolocation</li></ul>", "back": "<b>Latency</b> Latency Routing Policy will evaluate the latency between your users and AWS Regions, and help them get a DNS response that will minimize their latency (e.g. response time)" }
  , { "exam": "SAA-C03", "front": "You have a legal requirement that people in any country but France should NOT be able to access your website. Which Route 53 Routing Policy helps you in achieving this?<ul>"
                                + "<li>Latency</li>"
                                + "<li>Simple</li>"
                                + "<li>Multi Value</li>"
                                + "<li>Geolocation</li></ul>", "back": "<b>Geolocation</b> " }
  , { "exam": "SAA-C03", "front": "You have purchased a domain on GoDaddy and would like to use Route 53 as the DNS Service Provider. What should you do to make this work?<ul>"
                                + "<li>Request for a domain transfer</li>"
                                + "<li>Create a Private Hosted Zone and update the 3rd party Registrar NS records</li>"
                                + "<li>Create a Public Hosted Zone and update the Route 53 NS records</li>"
                                + "<li>Create a Public Hosted Zone and update the 3rd party Registrar NS records</li></ul>", "back": "<b>Create a Public Hosted Zone and update the 3rd party Registrar NS records</b> Public Hosted Zones are meant to be used for people requesting your website through the Internet. Finally, NS records must be updated on the 3rd party Registrar." }
  , { "exam": "SAA-C03", "front": "Which of the following are NOT valid Route 53 Health Checks?<ul>"
                                + "<li>Health Check that monitor SQS Queue</li>"
                                + "<li>Health Check that monitors an Endpoint</li>"
                                + "<li>Health Check that monitors other Health Checks</li>"
                                + "<li>Health Check that monitor CloudWatch Alarms</li></ul>", "back": "<b>Health Check that monitor SQS Queue</b> " }
  , { "exam": "SAA-C03", "front": "Your website TriangleSunglasses.com is hosted on a fleet of EC2 instances managed by an Auto Scaling Group and fronted by an Application Load Balancer. Your ASG has been configured to scale on-demand based on the traffic going to your website. To reduce costs, you have configured the ASG to scale based on the traffic going through the ALB. To make the solution highly available, you have updated your ASG and set the minimum capacity to 2. How can you further reduce the costs while respecting the requirements?<ul>"
                                + "<li>Remove the ALB and use an Elastic IP instead</li>"
                                + "<li>Reserve two EC2 instances</li>"
                                + "<li>Reduce the minimum capacity to 1</li>"
                                + "<li>Reduce the minimum capacity to 0</li></ul>", "back": "<b>Reserve two EC2 instances</b> This is the way to save further costs as we will run 2 EC2 instances no matter what." }
  , { "exam": "SAA-C03", "front": "Which of the following will NOT help us while designing a STATELESS application tier?<ul>"
                                + "<li>Store session data in Amazon RDS</li>"
                                + "<li>Store session data in Amazon ElastiCache</li>"
                                + "<li>Store session data in the client HTTP cookies</li>"
                                + "<li>Store session data on EBS volumes</li></ul>", "back": "<b>Store session data on EBS volumes</b> EBS volumes are created in a specific AZ and can only be attached to one EC2 instance at a time." }
  , { "exam": "SAA-C03", "front": "You want to install software updates on 100s of Linux EC2 instances that you manage. You want to store these updates on shared storage which should be dynamically loaded on the EC2 instances and shouldn't require heavy operations. What do you suggest?<ul>"
                                + "<li>Store the software updates on EBS and sync them using data replication software from one master in each AZ</li>"
                                + "<li>Store the software updates on EFS and mount EFS as a network drive at startup</li>"
                                + "<li>Package the software updates as an EBS snapshot and create EBS volumes for each new software update</li>"
                                + "<li>Store the software updates on Amazon RDS</li></ul>", "back": "<b>Store the software updates on EFS and mount EFS as a network drive at startup</b> EFS is a network file system (NFS) that allows you to mount the same file system to 100s of EC2 instances. Storing software updates on an EFS allows each EC2 instance to access them." }
  , { "exam": "SAA-C03", "front": "As a Solutions Architect, you're planning to migrate a complex ERP software suite to AWS Cloud. You're planning to host the software on a set of Linux EC2 instances managed by an Auto Scaling Group. The software traditionally takes over an hour to set up on a Linux machine. How do you recommend you speed up the installation process when there's a scale-out event?<ul>"
                                + "<li>Use a Golden AMI</li>"
                                + "<li>Bootstrap using EC2 User Data</li>"
                                + "<li>Store the application in Amazon RDS</li>"
                                + "<li>Retrieve the application setup files from EFS</li></ul>", "back": "<b>Use a Golden AMI</b> Golden AMI is an image that contains all your software installed and configured so that future EC2 instances can boot up quickly from that AMI." }
  , { "exam": "SAA-C03", "front": "You're developing an application and would like to deploy it to Elastic Beanstalk with minimal cost. You should run it in ..................<ul>"
                                + "<li>Single Instance Mode</li>"
                                + "<li>High Availability Mode</li></ul>", "back": "<b>Single Instance Mode</b> The question mentions that you're still in the development stage and you want to reduce costs. Single Instance Mode will create one EC2 instance and one Elastic IP." }
  , { "exam": "SAA-C03", "front": "You're deploying your application to an Elastic Beanstalk environment but you notice that the deployment process is painfully slow. After reviewing the logs, you found that your dependencies are resolved on each EC2 instance each time you deploy. How can you speed up the deployment process with minimal impact?<ul>"
                                + "<li>Remove some dependencies in your code</li>"
                                + "<li>Place the dependencies in Amazon EFS</li>"
                                + "<li>Create a Golden AMI that contains the dependencies and use that image to launch the EC2 instances</li></ul>", "back": "<b>Create a Golden AMI that contains the dependencies and use that image to launch the EC2 instances</b> Golden AMI is an image that contains all your software, dependencies, and configurations, so that future EC2 instances can boot up quickly from that AMI." }
  , { "exam": "SAA-C03", "front": "You're getting errors while trying to create a new S3 bucket named 'dev'. You're using a new AWS Account with no S3 buckets created before. And you double-checked and found that you have the correct IAM permissions to create S3 Buckets. What is a possible cause for this?<ul>"
                                + "<li>Only AWS account root user can create S3 Buckets</li>"
                                + "<li>S3 bucket names must be globally unique and 'dev' is already taken</li></ul>", "back": "<b>S3 bucket names must be globally unique and 'dev' is already taken</b> " }
  , { "exam": "SAA-C03", "front": "You have enabled versioning in your S3 bucket which already contains a lot of files. Which version will the existing files have?<ul>"
                                + "<li>1</li>"
                                + "<li>0</li>"
                                + "<li>-1</li>"
                                + "<li>null</li></ul>", "back": "<b>null</b> because when you enable versioning on an S3 bucket, existing objects default to having no version ID, which is represented as 'null' until new versions are created. " }
  , { "exam": "SAA-C03", "front": "You have updated an S3 bucket policy to allow IAM users to read/write files in the S3 bucket, but one of the users complain that he can't perform a PutObject API call. What is a possible cause for this?<ul>"
                                + "<li>The S3 bucket policy must be wrong</li>"
                                + "<li>The user is lacking permissions</li>"
                                + "<li>The IAM user must have an explicit DENY in the attached IAM Policy</li>"
                                + "<li>You need to contact AWS Support to lift this limit</li></ul>", "back": "<b>The IAM user must have an explicit DENY in the attached IAM Policy</b> Explicit DENY in an IAM Policy will take precedence over an S3 bucket policy." }
  , { "exam": "SAA-C03", "front": "You want the content of an S3 bucket to be fully available in different AWS Regions. That will help your team perform data analysis at the lowest latency and cost possible. What S3 feature should you use?<ul>"
                                + "<li>Amazon CloudFront Distributions</li>"
                                + "<li>S3 Versioning</li>"
                                + "<li>S3 Static Website Hosting</li>"
                                + "<li>S3 Replication</li></ul>", "back": "<b>S3 Replication</b> S3 Replication allows you to replicate data from an S3 bucket to another in the same/different AWS Region." }
  , { "exam": "SAA-C03", "front": "You have 3 S3 buckets. One source bucket A, and two destination buckets B and C in different AWS Regions. You want to replicate objects from bucket A to both bucket B and C. How would you achieve this?<ul>"
                                + "<li>Configure replication from bucket A to bucket B, then from bucket A to bucket C</li>"
                                + "<li>Configure replication from bucket A to bucket B, then from bucket B to bucket C</li>"
                                + "<li>Configure replication from bucket A to bucket C, then from bucket C to bucket B</li></ul>", "back": "<b>Configure replication from bucket A to bucket B, then from bucket A to bucket C</b> " }
  , { "exam": "SAA-C03", "front": "Which of the following is NOT a Glacier Deep Archive retrieval mode?<ul>"
                                + "<li>Expedited (1 - 5 minutes)</li>"
                                + "<li>Standard (12 hours)</li>"
                                + "<li>Bulk (48 hours)</li></ul>", "back": "<b>Expedited (1 - 5 minutes)</b> " }
  , { "exam": "SAA-C03", "front": "Which of the following is NOT a Glacier Flexible retrieval mode?<ul>"
                                + "<li>Instant (10 seconds)</li>"
                                + "<li>Expedited (1 - 5 minutes)</li>"
                                + "<li>Standard (3 - 5 hours)</li>"
                                + "<li>Bulk (5 - 12 hours)</li></ul>", "back": "<b>Instant (10 seconds)</b> " }
  , { "exam": "SAA-C03", "front": "How can you be notified when there's an object uploaded to your S3 bucket?<ul>"
                                + "<li>S3 Select</li>"
                                + "<li>S3 Access Logs</li>"
                                + "<li>S3 Event Notifications</li>"
                                + "<li>S3 Analytics</li></ul>", "back": "<b>S3 Event Notifications</b> " }
  , { "exam": "SAA-C03", "front": "You have an S3 bucket that has S3 Versioning enabled. This S3 bucket has a lot of objects, and you would like to remove old object versions to reduce costs. What's the best approach to automate the deletion of these old object versions?<ul>"
                                + "<li>S3 Lifecycle Rules - Transition Actions</li>"
                                + "<li>S3 Lifecycle Rules - Expiration Actions</li>"
                                + "<li>S3 Access Logs</li></ul>", "back": "<b>S3 Lifecycle Rules - Expiration Actions</b> " }
  , { "exam": "SAA-C03", "front": "How can you automate the transition of S3 objects between their different tiers?<ul>"
                                + "<li>AWS Lambda</li>"
                                + "<li>CloudWatch Events</li>"
                                + "<li>S3 Lifecycle Rules</li></ul>", "back": "<b>S3 Lifecycle Rules</b> " }
  , { "exam": "SAA-C03", "front": "While you're uploading large files to an S3 bucket using Multi-part Upload, there are a lot of unfinished parts stored in the S3 bucket due to network issues. You are not using these unfinished parts and they cost you money. What is the best approach to remove these unfinished parts?<ul>"
                                + "<li>Use AWS Lambda to loop on each old/unfinished part and delete them</li>"
                                + "<li>Request AWS Support to help you delete old/unfinished parts</li>"
                                + "<li>Use an S3 Lifecycle Policy to automate old/unfinished parts deletion</li></ul>", "back": "<b>Use an S3 Lifecycle Policy to automate old/unfinished parts deletion</b> " }
  , { "exam": "SAA-C03", "front": "You are looking to get recommendations for S3 Lifecycle Rules. How can you analyze the optimal number of days to move objects between different storage tiers?<ul>"
                                + "<li>S3 Inventory</li>"
                                + "<li>S3 Analytics</li>"
                                + "<li>S3 Lifecycle Rules Advisor</li></ul>", "back": "<b>S3 Analytics</b> " }
  , { "exam": "SAA-C03", "front": "You are looking to build an index of your files in S3, using Amazon RDS PostgreSQL. To build this index, it is necessary to read the first 250 bytes of each object in S3, which contains some metadata about the content of the file itself. There are over 100,000 files in your S3 bucket, amounting to 50 TB of data. How can you build this index efficiently?<ul>"
                                + "<li>Use the RDS Import feature to load the data from S3 to PostgreSQL, and run a SQL query to build the index</li>"
                                + "<li>Create an application that will traverse the S3 bucket, read all the files one by one, extract the first 250 bytes, and store that information in RDS</li>"
                                + "<li>Create an application that will traverse the S3 bucket, issue a Byte Range Fetch for the first 250 bytes, and store that information in RDS</li>"
                                + "<li>Create an application that will traverse the S3 bucket, use Athena to get the first 250 bytes, and store that information in RDS</li></ul>", "back": "<b>Create an application that will traverse the S3 bucket, issue a Byte Range Fetch for the first 250 bytes, and store that information in RDS</b> " }
  , { "exam": "SAA-C03", "front": "You have a large dataset stored on-premises that you want to upload to the S3 bucket. The dataset is divided into 10 GB files. You have good bandwidth but your Internet connection isn't stable. What is the best way to upload this dataset to S3 and ensure that the process is fast and avoid any problems with the Internet connection?<ul>"
                                + "<li>Use Multi-part Upload Only</li>"
                                + "<li>Use S3 Select & Use S3 Transfer Acceleration</li>"
                                + "<li>Use S3 Multi-part Upload & S3 Transfer Acceleration</li></ul>", "back": "<b>Use S3 Multi-part Upload & S3 Transfer Acceleration</b> " }
  , { "exam": "SAA-C03", "front": "A company is preparing for compliance and regulatory review on its infrastructure on AWS. Currently, they have their files stored on S3 buckets encrypted using S3 Default Encryption, which must be encrypted using KMS as required for compliance and regulatory review. Which S3 feature allows them to encrypt all files in their S3 buckets in the most efficient and cost-effective way?<ul>"
                                + "<li>S3 Access Points</li>"
                                + "<li>S3 Cross-Region Replication</li>"
                                + "<li>S3 Batch Operations</li>"
                                + "<li>S3 Lifecycle Rules</li></ul>", "back": "<b>S3 Batch Operations</b> it allows you to efficiently perform bulk operations on your S3 objects, including updating their encryption to use KMS, fulfilling compliance requirements without needing to re-upload each file individually." }
  , { "exam": "SAA-C03", "front": "You have a 25 GB file that you're trying to upload to S3 but you're getting errors. What is a possible solution for this?<ul>"
                                + "<li>The file size limit on S3 is 5 GB</li>"
                                + "<li>Update your bucket policy to allow the larger file</li>"
                                + "<li>Use Multi-Part upload when uploading files larger than 5GB</li>"
                                + "<li>Encrypt the file</li></ul>", "back": "<b>Use Multi-Part upload when uploading files larger than 5GB</b> Multi-Part Upload is recommended as soon as the file is over 100 MB." }
  , { "exam": "SAA-C03", "front": "Your client wants to make sure that file encryption is happening in S3, but he wants to fully manage the encryption keys and never store them in AWS. You recommend him to use ............................<ul>"
                                + "<li>SSE-S3</li>"
                                + "<li>SSE-KMS</li>"
                                + "<li>SSE-C</li>"
                                + "<li>Client-Side Encryption</li></ul>", "back": "<b>SSE-C</b> With SSE-C, the encryption happens in AWS and you have full control over the encryption keys." }
  , { "exam": "SAA-C03", "front": "A company you're working for wants their data stored in S3 to be encrypted. They don't mind the encryption keys stored and managed by AWS, but they want to maintain control over the rotation policy of the encryption keys. You recommend them to use ....................<ul>"
                                + "<li>SSE-S3</li>"
                                + "<li>SSE-KMS</li>"
                                + "<li>SSE-C</li>"
                                + "<li>Client-Side Encryption</li></ul>", "back": "<b>SSE-KMS</b> With SSE-KMS, the encryption happens in AWS, and the encryption keys are managed by AWS but you have full control over the rotation policy of the encryption key. Encryption keys stored in AWS." }
  , { "exam": "SAA-C03", "front": "Your company does not trust AWS for the encryption process and wants it to happen on the application. You recommend them to use ....................<ul>"
                                + "<li>SSE-S3</li>"
                                + "<li>SSE-KMS</li>"
                                + "<li>SSE-C</li>"
                                + "<li>Client-Side Encryption</li></ul>", "back": "<b>Client-Side Encryption</b> With Client-Side Encryption, you have to do the encryption yourself and you have full control over the encryption keys. You perform the encryption yourself and send the encrypted data to AWS. AWS does not know your encryption keys and cannot decrypt your data." }
  , { "exam": "SAA-C03", "front": "You have a website that loads files from an S3 bucket. When you try the URL of the files directly in your Chrome browser it works, but when a website with a different domain tries to load these files it doesn't. What's the problem?<ul>"
                                + "<li>The Bucket policy is wrong</li>"
                                + "<li>The IAM policy is wrong</li>"
                                + "<li>CORS is wrong</li>"
                                + "<li>Encryption is wrong</li></ul>", "back": "<b>CORS is wrong</b> Cross-Origin Resource Sharing (CORS) defines a way for client web applications that are loaded in one domain to interact with resources in a different domain. To learn more about CORS, go here: https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html" }
  , { "exam": "SAA-C03", "front": "An e-commerce company has its customers and orders data stored in an S3 bucket. The company’s CEO wants to generate a report to show the list of customers and the revenue for each customer. Customer data stored in files on the S3 bucket has sensitive information that we don’t want to expose in the report. How do you recommend the report can be created without exposing sensitive information?<ul>"
                                + "<li>Use S3 Object Lambda to change the objects before they are retrieved by the report generator application</li>"
                                + "<li>Create another S3 bucket. Create a lambda function to process each file, remove the sensitive information, and then move them to the new S3 bucket</li>"
                                + "<li>Use S3 Object Lock to lock the sensitive information from being fetched by the report generator application</li></ul>", "back": "<b>Use S3 Object Lambda to change the objects before they are retrieved by the report generator application</b> " }
  , { "exam": "SAA-C03", "front": "You suspect that some of your employees try to access files in an S3 bucket that they don't have access to. How can you verify this is indeed the case without them noticing?<ul>"
                                + "<li>Enable S3 Access Logs and analyze them using Athena</li>"
                                + "<li>Restrict their IAM policies and look at CloudTail logs</li>"
                                + "<li>Use a bucket policy</li></ul>", "back": "<b>Enable S3 Access Logs and analyze them using Athena</b> S3 Access Logs log all the requests made to S3 buckets and Amazon Athena can then be used to run serverless analytics on top of the log files." }
  , { "exam": "SAA-C03", "front": "You are looking to provide temporary URLs to a growing list of federated users to allow them to perform a file upload on your S3 bucket to a specific location. What should you use?<ul>"
                                + "<li>S3 CORS</li>"
                                + "<li>S3 Pre-Signed URL</li>"
                                + "<li>S3 Bucket Policies</li></ul>", "back": "<b>S3 Pre-Signed URL</b> S3 Pre-Signed URLs are temporary URLs that you generate to grant time-limited access to some actions in your S3 bucket." }
  , { "exam": "SAA-C03", "front": "For compliance reasons, your company has a policy mandate that database backups must be retained for 4 years. It shouldn't be possible to erase them. What do you recommend?<ul>"
                                + "<li>Glacier Vaults with Vault Lock Policies</li>"
                                + "<li>EFS network drives with restrictive Linux permissions</li>"
                                + "<li>S3 with Bucket Policies</li></ul>", "back": "<b>Glacier Vaults with Vault Lock Policies</b> " }
  , { "exam": "SAA-C03", "front": "You would like all your files in an S3 bucket to be encrypted by default. What is the optimal way of achieving this?<ul>"
                                + "<li>Use a bucket policy that forces HTTPS connections</li>"
                                + "<li>Do nothing, Amazon S3 automatically encrypt new objects using Server-Side Encryption with S3-Managed Keys (SSE-S3)</li>"
                                + "<li>Enable Versioning</li></ul>", "back": "<b>Do nothing, Amazon S3 automatically encrypt new objects using Server-Side Encryption with S3-Managed Keys (SSE-S3)</b> " }
  , { "exam": "SAA-C03", "front": "You have enabled versioning and want to be extra careful when it comes to deleting files on an S3 bucket. What should you enable to prevent accidental permanent deletions?<ul>"
                                + "<li>Use a bucket policy</li>"
                                + "<li>Enable MFA Delete</li>"
                                + "<li>Encrypt the files</li>"
                                + "<li>Disable versioning</li></ul>", "back": "<b>Enable MFA Delete</b> MFA Delete forces users to use MFA codes before deleting S3 objects. It's an extra level of security to prevent accidental deletions." }
  , { "exam": "SAA-C03", "front": "A company has its data and files stored on some S3 buckets. Some of these files need to be kept for a predefined period of time and protected from being overwritten and deletion according to company compliance policy. Which S3 feature helps you in doing this?<ul>"
                                + "<li>S3 Object Lock - Retention Governance Mode</li>"
                                + "<li>S3 Versioning</li>"
                                + "<li>S3 Object Lock - Retention Compliance Mode</li>"
                                + "<li>S3 Glacier Vault Lock</li></ul>", "back": "<b>S3 Object Lock - Retention Compliance Mode</b> " }
  , { "exam": "SAA-C03", "front": "Which of the following S3 Object Lock configuration allows you to prevent an object or its versions from being overwritten or deleted indefinitely and gives you the ability to remove it manually?<ul>"
                                + "<li>Retention Governance Mode</li>"
                                + "<li>Retention Compliance Mode</li>"
                                + "<li>Legal Hold</li></ul>", "back": "<b>Legal Hold</b> " }
  , { "exam": "SAA-C03", "front": "You have a CloudFront Distribution that serves your website hosted on a fleet of EC2 instances behind an Application Load Balancer. All your clients are from the United States, but you found that some malicious requests are coming from other countries. What should you do to only allow users from the US and block other countries?<ul>"
                                + "<li>Use CloudFront Geo Restriction</li>"
                                + "<li>Use Origin Access Control</li>"
                                + "<li>Set up a security group and attach it to your CloudFront Distribution</li>"
                                + "<li>Use a Route 53 Latency record and attach it to CloudFront</li></ul>", "back": "<b>Use CloudFront Geo Restriction</b> " }
  , { "exam": "SAA-C03", "front": "You have a static website hosted on an S3 bucket. You have created a CloudFront Distribution that points to your S3 bucket to better serve your requests and improve performance. After a while, you noticed that users can still access your website directly from the S3 bucket. You want to enforce users to access the website only through CloudFront. How would you achieve that?<ul>"
                                + "<li>Send an email to your clients and tell them to not use the S3 endpoint</li>"
                                + "<li>Configure your CloudFront Distribution and create an Origin Access Control (OAC), then update your S3 Bucket Policy to only accept requests from your CloudFront Distribution.</li>"
                                + "<li>Use S3 Access Points to redirect clients to CloudFront</li></ul>", "back": "<b>Configure your CloudFront Distribution and create an Origin Access Control (OAC), then update your S3 Bucket Policy to only accept requests from your CloudFront Distribution.</b> " }
  , { "exam": "SAA-C03", "front": "What does this S3 bucket policy do?\n<pre>\n{\n  'Version': '2012-10-17',\n  'Id': 'Mystery policy',\n  'Statement': [{\n    'Sid': 'What could it be?',\n    'Effect': 'Allow',\n    'Principal': {\n     'Service': 'cloudfront.amazonaws.com'\n    },\n    'Action': 's3:GetObject',\n    'Resource': 'arn:aws:s3:::examplebucket/*',\n    'Condition': {\n      'StringEquals':{\n        'AWS:SourceArn': 'arn:aws:cloudfront::123456789012:distribution/EDFDVBD6EXAMPLE'\n      }\n    }\n  }]\n}</pre><ul>"
                                + "<li>Forces GetObject request to be encrypted if coming from CloudFront</li>"
                                + "<li>Only allows the S3 bucket content to be accessed from your CloudFront Distribution</li>"
                                + "<li>Only allows GetObject type of request on the S3 bucket from anybody</li></ul>", "back": "<b>Only allows the S3 bucket content to be accessed from your CloudFront Distribution</b> " }
  , { "exam": "SAA-C03", "front": "A WordPress website is hosted in a set of EC2 instances in an EC2 Auto Scaling Group and fronted by a CloudFront Distribution which is configured to cache the content for 3 days. You have released a new version of the website and want to release it immediately to production without waiting for 3 days for the cached content to be expired. What is the easiest and most efficient way to solve this?<ul>"
                                + "<li>Open a support ticket with AWS Support to remove the CloudFront Cache</li>"
                                + "<li>CloudFront Cache Invalidation</li>"
                                + "<li>EC2 Cache Invalidation</li></ul>", "back": "<b>CloudFront Cache Invalidation</b> " }
  , { "exam": "SAA-C03", "front": "A company is migrating a web application to AWS Cloud and they are going to use a set of EC2 instances in an EC2 Auto Scaling Group. The web application is made of multiple components so they will need a host-based routing feature to route to specific web application components. This web application is used by many customers and therefore the web application must have a static IP address so it can be whitelisted by the customers’ firewalls. As the customers are distributed around the world, the web application must also provide low latency to all customers. Which AWS service can help you to assign a static IP address and provide low latency across the globe?<ul>"
                                + "<li>AWS Global Accelerator + Application Load Balancer</li>"
                                + "<li>Amazon CloudFront</li>"
                                + "<li>Network Load Balancer</li>"
                                + "<li>Application Load Balancer</li></ul>", "back": "<b>AWS Global Accelerator + Application Load Balancer</b> " }
  , { "exam": "SAA-C03", "front": "You need to move hundreds of Terabytes into Amazon S3, then process the data using a fleet of EC2 instances. You have a 1 Gbit/s broadband. You would like to move the data faster and possibly processing it while in transit. What do you recommend?<ul>"
                                + "<li>Use your network</li>"
                                + "<li>Use Snowcone</li>"
                                + "<li>Use AWS Data Migration</li>"
                                + "<li>Use Snowball Edge</li></ul>", "back": "<b>Use Snowball Edge</b> Snowball Edge is the right answer as it comes with computing capabilities and allows you to pre-process the data while it's being moved into Snowball." }
  , { "exam": "SAA-C03", "front": "You want to expose virtually infinite storage for your tape backups. You want to keep the same software you're using and want an iSCSI compatible interface. What do you use?<ul>"
                                + "<li>AWS Snowball</li>"
                                + "<li>AWS Storage Gateway - Tape Gateway</li>"
                                + "<li>AWS Storage Gateway - Volume Gateway</li>"
                                + "<li>AWS Storage Gateway - S3 File Gateway</li></ul>", "back": "<b>AWS Storage Gateway - Tape Gateway</b> " }
  , { "exam": "SAA-C03", "front": "Your EC2 Windows Servers need to share some data by having a Network File System mounted on them which respects the Windows security mechanisms and has integration with Microsoft Active Directory. What do you recommend?<ul>"
                                + "<li>Amazon FSx for Windows (File Server)</li>"
                                + "<li>Amazon EFS</li>"
                                + "<li>Amazon FSx for Lustre</li>"
                                + "<li>S3 File Gateway</li></ul>", "back": "<b>Amazon FSx for Windows (File Server)</b> " }
  , { "exam": "SAA-C03", "front": "You have hundreds of Terabytes that you want to migrate to AWS S3 as soon as possible. You tried to use your network bandwidth and it will take around 3 weeks to complete the upload process. What is the recommended approach to using in this situation?<ul>"
                                + "<li>AWS Storage Gateway - Volume Gateway</li>"
                                + "<li>S3 Multi-part Upload</li>"
                                + "<li>AWS Snowball Edge</li>"
                                + "<li>AWS Data Migration Service</li></ul>", "back": "<b>AWS Snowball Edge</b> " }
  , { "exam": "SAA-C03", "front": "You have a large dataset stored in S3 that you want to access from on-premises servers using the NFS or SMB protocol. Also, you want to authenticate access to these files through on-premises Microsoft AD. What would you use?<ul>"
                                + "<li>AWS Storage Gateway - Volume Gateway</li>"
                                + "<li>AWS Storage Gateway - S3 File Gateway</li>"
                                + "<li>AWS Storage Gateway - Tape Gateway</li>"
                                + "<li>AWS Data Migration Service</li></ul>", "back": "<b>AWS Storage Gateway - S3 File Gateway</b> " }
  , { "exam": "SAA-C03", "front": "You are planning to migrate your company's infrastructure from on-premises to AWS Cloud. You have an on-premises Microsoft Windows File Server that you want to migrate. What is the most suitable AWS service you can use?<ul>"
                                + "<li>Amazon FSx for Windows (File Server)</li>"
                                + "<li>AWS Storage Gateway - S3 File Gateway</li>"
                                + "<li>AWS Managed Microsoft AD</li></ul>", "back": "<b>Amazon FSx for Windows (File Server)</b> " }
  , { "exam": "SAA-C03", "front": "You would like to have a distributed POSIX compliant file system that will allow you to maximize the IOPS in order to perform some High-Performance Computing (HPC) and genomics computational research. This file system has to easily scale to millions of IOPS. What do you recommend?<ul>"
                                + "<li>EFS with Max. IO enabled</li>"
                                + "<li>Amazon FSx for Lustre</li>"
                                + "<li>Amazon S3 mounted on the EC2 instances</li>"
                                + "<li>EC2 Instance Store</li></ul>", "back": "<b>Amazon FSx for Lustre</b> " }
  , { "exam": "SAA-C03", "front": "Which deployment option in the FSx file system provides you with long-term storage that's replicated within AZ?<ul>"
                                + "<li>Scratch File System</li>"
                                + "<li>Persistent File System</li></ul>", "back": "<b>Persistent File System</b> Provides long-term storage where data is replicated within the same AZ. Failed files were replaced within minutes." }
  , { "exam": "SAA-C03", "front": "Which of the following protocols is NOT supported by AWS Transfer Family?<ul>"
                                + "<li>File Transfer Protocol (FTP)</li>"
                                + "<li>File Transfer Protocol over SSL (FTPS)</li>"
                                + "<li>Secure Shell Protocol (SSH)</li>"
                                + "<li>Secure File Transfer Protocol (SFTP)</li></ul>", "back": "<b>Secure Shell Protocol (SSH)</b> AWS Transfer Family is a managed service for file transfers into and out of S3 or EFS using the FTP protocol, thus SSH is not supported." }
  , { "exam": "SAA-C03", "front": "A Solutions Architect is working on planning the migration of a startup company from on-premises to AWS. Currently, their infrastructure consists of many servers and 30 TB of data hosted on a shared NFS storage. He has decided to use Amazon S3 to host the data. Which AWS service can efficiently migrate the data from on-premises to S3?<ul>"
                                + "<li>AWS Storage Tape Gateway</li>"
                                + "<li>Amazon EBS</li>"
                                + "<li>AWS Transfer Family</li>"
                                + "<li>AWS DataSync</li></ul>", "back": "<b>AWS DataSync</b> " }
  , { "exam": "SAA-C03", "front": "Which AWS service is best suited to migrate a large amount of data from an S3 bucket to an EFS file system?<ul>"
                                + "<li>AWS Snowball</li>"
                                + "<li>AWS DataSync</li>"
                                + "<li>AWS Transfer Family</li>"
                                + "<li>AWS Backup</li></ul>", "back": "<b>AWS DataSync</b> " }
  , { "exam": "SAA-C03", "front": "A Machine Learning company is working on a set of datasets that are hosted on S3 buckets. The company decided to release those datasets to the public to be useful for others in their research, but they don’t want to configure the S3 bucket to be public. And those datasets should be exposed over the FTP protocol. What can they do to do the requirement efficiently and with the least effort?<ul>"
                                + "<li>Use AWS Transfer Family</li>"
                                + "<li>Create an EC2 instance with an FTP server installed then copy the data from S3 to the EC2 instance</li>"
                                + "<li>Use AWS Storage Gateway</li>"
                                + "<li>Copy the data from S3 to an EFS file system, then expose them over the FTP protocol</li></ul>", "back": "<b>Use AWS Transfer Family</b> because it provides a managed service for securely transferring files over FTP or SFTP directly to and from S3, allowing you to share your datasets without making the S3 bucket public." }
  , { "exam": "SAA-C03", "front": "Amazon FSx for NetApp ONTAP is compatible with the following protocols, EXCEPT ………………<ul>"
                                + "<li>NFS</li>"
                                + "<li>SMB</li>"
                                + "<li>FTP</li>"
                                + "<li>iSCSI</li></ul>", "back": "<b>FTP</b> " }
  , { "exam": "SAA-C03", "front": "Which AWS service is best suited when migrating from an on-premises ZFS file system to AWS?<ul>"
                                + "<li>Amazon FSx for OpenZFS</li>"
                                + "<li>Amazon FSx for NetApp ONTAP</li>"
                                + "<li>Amazon FSx for Windows File Server</li>"
                                + "<li>Amazon FSx for Luster</li></ul>", "back": "<b>Amazon FSx for OpenZFS</b> " }
  , { "exam": "SAA-C03", "front": "A company is running Amazon S3 File Gateway to host their data on S3 buckets and is able to mount them on-premises using SMB. The data currently is hosted on S3 Standard storage class and there is a requirement to reduce the costs for S3. So, they have decided to migrate some of those data to S3 Glacier. What is the most efficient way they can use to move the data to S3 Glacier automatically?<ul>"
                                + "<li>Create a Lambda function to migrate data to S3 Glacier and periodically trigger it every day using Amazon EventBridge</li>"
                                + "<li>Use S3 Batch Operations to loop through S3 files and move them to S3 Glacier every day</li>"
                                + "<li>Use S3 Lifecycle Policy</li>"
                                + "<li>Use AWS DataSync to replicate data to S3 Glacier every day</li>"
                                + "<li>Configure S3 File Gateway to send the data to S3 Glacier directly</li></ul>", "back": "<b>Use S3 Lifecycle Policy</b> " }
  , { "exam": "SAA-C03", "front": "You have on-premises sensitive files and documents that you want to regularly synchronize to AWS to keep another copy. Which AWS service can help you with that?<ul>"
                                + "<li>AWS Database Migration Service</li>"
                                + "<li>Amazon EFS</li>"
                                + "<li>AWS DataSync</li></ul>", "back": "<b>AWS DataSync</b> AWS DataSync is an online data transfer service that simplifies, automates, and accelerates moving data between on-premises storage systems and AWS Storage services, as well as between AWS Storage services." }
  , { "exam": "SAA-C03", "front": "AWS DataSync supports the following locations, EXCEPT ....................<ul>"
                                + "<li>Amazon S3</li>"
                                + "<li>Amazon EBS</li>"
                                + "<li>Amazon EFS</li>"
                                + "<li>Amazon FSx for Windows File Server</li></ul>", "back": "<b>Amazon EBS</b>, and I guess because EBS is block storage? not sure why" }
  , { "exam": "SAA-C03", "front": "You have an e-commerce website and you are preparing for Black Friday which is the biggest sale of the year. You expect that your traffic will increase by 100x. Your website already using an SQS Standard Queue, and you're running a fleet of EC2 instances in an Auto Scaling Group to consume SQS messages. What should you do to prepare your SQS Queue?<ul>"
                                + "<li>Contact AWS Support to pre-warm your SQS Standard Queue</li>"
                                + "<li>Enable Auto Scaling in your SQS queue</li>"
                                + "<li>Increase the capacity of the SQS queue</li>"
                                + "<li>Do nothing, SQS scales automatically</li></ul>", "back": "<b>Do nothing, SQS scales automatically</b> " }
  , { "exam": "SAA-C03", "front": "You have an SQS Queue where each consumer polls 10 messages at a time and finishes processing them in 1 minute. After a while, you noticed that the same SQS messages are received by different consumers resulting in your messages being processed more than once. What should you do to resolve this issue?<ul>"
                                + "<li>Enable Long Polling</li>"
                                + "<li>Add DelaySeconds parameter to the messages when being produced</li>"
                                + "<li>Increase the Visibility Timeout</li>"
                                + "<li>Decrease the Visibility Timeout</li></ul>", "back": "<b>Increase the Visibility Timeout</b> SQS Visibility Timeout is a period of time during which Amazon SQS prevents other consumers from receiving and processing the message again. In Visibility Timeout, a message is hidden only after it is consumed from the queue. Increasing the Visibility Timeout gives more time to the consumer to process the message and prevent duplicate reading of the message. (default: 30 sec., min.: 0 sec., max.: 12 hours)" }
  , { "exam": "SAA-C03", "front": "Which SQS Queue type allows your messages to be processed exactly once and in order?<ul>"
                                + "<li>SQS Standard Queue</li>"
                                + "<li>SQS Dead Letter Queue</li>"
                                + "<li>SQS Delay Queue</li>"
                                + "<li>SQS FIFO Queue</li></ul>", "back": "<b>SQS FIFO Queue</b> SQS FIFO (First-In-First-Out) Queues have all the capabilities of the SQS Standard Queue, plus the following two features. First, The order in which messages are sent and received are strictly preserved and a message is delivered once and remains available until a consumer process and deletes it. Second, duplicated messages are not introduced into the queue." }
  , { "exam": "SAA-C03", "front": "You have 3 different applications that you'd like to send them the same message. All 3 applications are using SQS. What is the best approach would you choose?<ul>"
                                + "<li>Use SQS Replication Feature</li>"
                                + "<li>Use SNS + SQS Fan Out Pattern</li>"
                                + "<li>Send messages individually to 3 SQS queues</li></ul>", "back": "<b>Use SNS + SQS Fan Out Pattern</b> This is a common pattern where only one message is sent to the SNS topic and then 'fan-out' to multiple SQS queues. This approach has the following features: it's fully decoupled, no data loss, and you have the ability to add more SQS queues (more applications) over time." }
  , { "exam": "SAA-C03", "front": "You have a Kinesis data stream with 6 shards provisioned. This data stream usually receiving 5 MB/s of data and sending out 8 MB/s. Occasionally, your traffic spikes up to 2x and you get a ProvisionedThroughputExceeded exception. What should you do to resolve the issue?<ul>"
                                + "<li>Add more Shards</li>"
                                + "<li>Enable Kinesis Replication</li>"
                                + "<li>Use SQS as a buffer to Kinesis</li></ul>", "back": "<b>Add more Shards</b> The capacity limits of a Kinesis data stream are defined by the number of shards within the data stream. The limits can be exceeded by either data throughput or the number of reading data calls. Each shard allows for 1 MB/s incoming data and 2 MB/s outgoing data. You should increase the number of shards within your data stream to provide enough capacity." }
  , { "exam": "SAA-C03", "front": "You have a website where you want to analyze clickstream data such as the sequence of clicks a user makes, the amount of time a user spends, and where the navigation begins and how it ends. You decided to use Amazon Kinesis, so you have configured the website to send these clickstream data all the way to a Kinesis data stream. While you checking the data sent to your Kinesis data stream, you found that the users' data is not ordered and the data for one individual user is spread across many shards. How would you fix this problem?<ul>"
                                + "<li>There are too many shards, you should only use 1 shard</li>"
                                + "<li>You shouldn't use multiple consumers, only one and it should re-order data</li>"
                                + "<li>For each record sent to Kinesis add a partition key that represents the identity of the user</li></ul>", "back": "<b>For each record sent to Kinesis add a partition key that represents the identity of the user</b> Kinesis Data Stream uses the partition key associated with each data record to determine which shard a given data record belongs to. When you use the identity of each user as the partition key, this ensures the data for each user is ordered hence sent to the same shard." }
  , { "exam": "SAA-C03", "front": "You are running an application that produces a large amount of real-time data that you want to load into S3 and Redshift. Also, these data need to be transformed before being delivered to their destination. What is the best architecture would you choose?<ul>"
                                + "<li>SQS + AWS Lambda</li>"
                                + "<li>SNS + HTTP Endpoint</li>"
                                + "<li>Kinesis Data Streams + Kinesis Data Firehose</li></ul>", "back": "<b>Kinesis Data Streams + Kinesis Data Firehose</b> This is a perfect combo of technology for loading data near real-time data into S3 and Redshift. Kinesis Data Firehose supports custom data transformations using AWS Lambda." }
  , { "exam": "SAA-C03", "front": "Which of the following is NOT a supported subscriber for AWS SNS?<ul>"
                                + "<li>Amazon Kinesis Data Streams</li>"
                                + "<li>Amazon SQS</li>"
                                + "<li>HTTP(S) Endpoint</li>"
                                + "<li>AWS Lambda</li></ul>", "back": "<b>Amazon Kinesis Data Streams</b> Note: Kinesis Data Firehose is now supported, but not Kinesis Data Streams." }
  , { "exam": "SAA-C03", "front": "Which AWS service helps you when you want to send email notifications to your users?<ul>"
                                + "<li>Amazon SQS with AWS Lambda</li>"
                                + "<li>Amazon SNS</li>"
                                + "<li>Amazon Kinesis</li></ul>", "back": "<b>Amazon SNS</b> " }
  , { "exam": "SAA-C03", "front": "You're running many micro-services applications on-premises and they communicate using a message broker that supports MQTT protocol. You're planning to migrate these applications to AWS without re-engineering the applications and modifying the code. Which AWS service allows you to get a managed message broker that supports the MQTT protocol?<ul>"
                                + "<li>Amazon SQS</li>"
                                + "<li>Amazon SNS</li>"
                                + "<li>Amazon Kinesis</li>"
                                + "<li>Amazon MQ</li></ul>", "back": "<b>Amazon MQ</b> Amazon MQ supports industry-standard APIs such as JMS and NMS, and protocols for messaging, including AMQP, STOMP, MQTT, and WebSocket." }
  , { "exam": "SAA-C03", "front": "An e-commerce company is preparing for a big marketing promotion that will bring millions of transactions. Their website is hosted on EC2 instances in an Auto Scaling Group and they are using Amazon Aurora as their database. The Aurora database has a bottleneck and a lot of transactions have been failed in the last promotion they have made as they had a lot of transaction and the Aurora database wasn’t prepared to handle these too many transactions. What do you recommend to handle those transactions and prevent any failed transactions?<ul>"
                                + "<li>Use SQS as a buffer to write to Aurora</li>"
                                + "<li>Host the website in AWS Fargate instead of EC2 instances</li>"
                                + "<li>Migrate Aurora to RDS for SQL Server</li></ul>", "back": "<b>Use SQS as a buffer to write to Aurora</b> " }
  , { "exam": "SAA-C03", "front": "A company is using Amazon Kinesis Data Streams to ingest clickstream data and then do some analytical processes on it. There is a campaign in the next few days and the traffic is unpredictable which might grow up to 100x. What Kinesis Data Stream capacity mode do you recommend?<ul>"
                                + "<li>Provisioned Mode</li>"
                                + "<li>On-demand Mode</li></ul>", "back": "<b>On-demand Mode</b> " }
  , { "exam": "SAA-C03", "front": "You have multiple Docker-based applications hosted on-premises that you want to migrate to AWS. You don't want to provision or manage any infrastructure; you just want to run your containers on AWS. Which AWS service should you choose?<ul>"
                                + "<li>Elastic Container Service (ECS) in EC2 Launch Mode</li>"
                                + "<li>Elastic Container Registry (ECR)</li>"
                                + "<li>AWS Fargate on ECS</li></ul>", "back": "<b>AWS Fargate on ECS</b> AWS Fargate allows you to run your containers on AWS without managing any servers." }
  , { "exam": "SAA-C03", "front": "Amazon Elastic Container Service (ECS) has two Launch Types: .................. and ..................<ul>"
                                + "<li>Amazon EC2 Launch Type and Fargate Launch Type</li>"
                                + "<li>Amazon EC2 Launch Type and EKS Launch Type</li>"
                                + "<li>Fargate Launch Type and EKS Launch Type</li></ul>", "back": "<b>Amazon EC2 Launch Type and Fargate Launch Type</b> " }
  , { "exam": "SAA-C03", "front": "You have an application hosted on an ECS Cluster (EC2 Launch Type) where you want your ECS tasks to upload files to an S3 bucket. Which IAM Role for your ECS Tasks should you modify?<ul>"
                                + "<li>EC2 Instance Profile</li>"
                                + "<li>ECS Task Role</li></ul>", "back": "<b>ECS Task Role</b> ECS Task Role is the IAM Role used by the ECS task itself. Use when your container wants to call other AWS services like S3, SQS, etc." }
  , { "exam": "SAA-C03", "front": "You're planning to migrate a WordPress website running on Docker containers from on-premises to AWS. You have decided to run the application in an ECS Cluster, but you want your docker containers to access the same WordPress website content such as website files, images, videos, etc. What do you recommend to achieve this?<ul>"
                                + "<li>Mount an EFS volume</li>"
                                + "<li>Mount an EBS volume</li>"
                                + "<li>Use an EC2 Instance Store</li></ul>", "back": "<b>Mount an EFS volume</b> EFS volume can be shared between different EC2 instances and different ECS Tasks. It can be used as a persistent multi-AZ shared storage for your containers." }
  , { "exam": "SAA-C03", "front": "You are deploying an application on an ECS Cluster made of EC2 instances. Currently, the cluster is hosting one application that is issuing API calls to DynamoDB successfully. Upon adding a second application, which issues API calls to S3, you are getting authorization issues. What should you do to resolve the problem and ensure proper security?<ul>"
                                + "<li>Edit the EC2 instance role to add permissions to S3</li>"
                                + "<li>Create an IAM task role for the new application</li>"
                                + "<li>Enable the Fargate mode</li>"
                                + "<li>Edit the S3 bucket policy to allow the ECS task</li></ul>", "back": "<b>Create an IAM task role for the new application</b> " }
  , { "exam": "SAA-C03", "front": "You are migrating your on-premises Docker-based applications to Amazon ECS. You were using Docker Hub Container Image Library as your container image repository. Which is an alternative AWS service which is fully integrated with Amazon ECS?<ul>"
                                + "<li>AWS Fargate</li>"
                                + "<li>Elastic Container Registry (ECR)</li>"
                                + "<li>Elastic Kubernetes Service (EKS)</li>"
                                + "<li>Amazon EC2</li></ul>", "back": "<b>Elastic Container Registry (ECR)</b> Amazon ECR is a fully managed container registry that makes it easy to store, manage, share, and deploy your container images. ECR is fully integrated with Amazon ECS, allowing easy retrieval of container images from ECR while managing and running containers using ECS." }
  , { "exam": "SAA-C03", "front": "Amazon EKS supports the following node types, EXCEPT ………………..<ul>"
                                + "<li>Managed Node Groups</li>"
                                + "<li>Self-Managed Nodes</li>"
                                + "<li>AWS Fargate</li>"
                                + "<li>AWS Lambda</li></ul>", "back": "<b>AWS Lambda</b> " }
  , { "exam": "SAA-C03", "front": "A developer has a running website and APIs on his local machine using containers and he wants to deploy both of them on AWS. The developer is new to AWS and doesn’t know much about different AWS services. Which of the following AWS services allows the developer to build and deploy the website and the APIs in the easiest way according to AWS best practices?<ul>"
                                + "<li>AWS App Runner</li>"
                                + "<li>EC2 Instances + Application Load Balancer</li>"
                                + "<li>Amazon ECS</li>"
                                + "<li>AWS Fargate</li></ul>", "back": "<b>AWS App Runner</b> " }
  , { "exam": "SAA-C03", "front": "You have created a Lambda function that typically will take around 1 hour to process some data. The code works fine when you run it locally on your machine, but when you invoke the Lambda function it fails with a 'timeout' error after 3 seconds. What should you do?<ul>"
                                + "<li>Configure your Lambda's timeout to 25 minutes</li>"
                                + "<li>Configure your Lambda's memory to 10 GB</li>"
                                + "<li>Run your code somewhere else (e.g., EC2 instance)</li></ul>", "back": "<b>Run your code somewhere else (e.g., EC2 instance)</b> Lambda's maximum execution time is 15 minutes. You can run your code somewhere else such as an EC2 instance or use Amazon ECS." }
  , { "exam": "SAA-C03", "front": "Before you create a DynamoDB table, you need to provision the EC2 instance the DynamoDB table will be running on.<ul>"
                                + "<li>True</li>"
                                + "<li>False</li></ul>", "back": "<b>False</b> DynamoDB is serverless with no servers to provision, patch, or manage and no software to install, maintain or operate. It automatically scales tables up and down to adjust for capacity and maintain performance. It provides both provisioned (specify RCU & WCU) and on-demand (pay for what you use) capacity modes." }
  , { "exam": "SAA-C03", "front": "You have provisioned a DynamoDB table with 10 RCUs and 10 WCUs. A month later you want to increase the RCU to handle more read traffic. What should you do?<ul>"
                                + "<li>Increase RCU and keep WCU the same</li>"
                                + "<li>You need to increase both RCU and WCU</li>"
                                + "<li>Increase RCU and decrease WCU</li></ul>", "back": "<b>Increase RCU and keep WCU the same</b> RCU and WCU are decoupled, so you can increase/decrease each value separately." }
  , { "exam": "SAA-C03", "front": "You have an e-commerce website where you are using DynamoDB as your database. You are about to enter the Christmas sale and you have a few items which are very popular and you expect that they will be read often. Unfortunately, last year due to the huge traffic you had the ProvisionedThroughputExceededException exception. What would you do to prevent this error from happening again?<ul>"
                                + "<li>Increase the RCU to a very high value</li>"
                                + "<li>Create a DAX Cluster</li>"
                                + "<li>Migrate the database away from DynamoDB for the time of the sale</li></ul>", "back": "<b>Create a DAX Cluster</b> DynamoDB Accelerator (DAX) is a fully managed, highly available, in-memory cache for DynamoDB that delivers up to 10x performance improvement. It caches the most frequently used data, thus offloading the heavy reads on hot keys off your DynamoDB table, hence preventing the 'ProvisionedThroughputExceededException' exception." }
  , { "exam": "SAA-C03", "front": "You have developed a mobile application that uses DynamoDB as its datastore. You want to automate sending welcome emails to new users after they sign up. What is the most efficient way to achieve this?<ul>"
                                + "<li>Schedule a Lambda function to run every minute using CloudWatch Events, scan the entire table looking for new users</li>"
                                + "<li>Enable SNS and DynamoDB integration</li>"
                                + "<li>Enable DynamoDB Streams and configure it to invoke a Lambda function to send emails</li></ul>", "back": "<b>Enable DynamoDB Streams and configure it to invoke a Lambda function to send emails</b> DynamoDB Streams allows you to capture a time-ordered sequence of item-level modifications in a DynamoDB table. It's integrated with AWS Lambda so that you create triggers that automatically respond to events in real-time." }
  , { "exam": "SAA-C03", "front": "To create a serverless API, you should integrate Amazon API Gateway with ......................<ul>"
                                + "<li>EC2 Instance</li>"
                                + "<li>Elastic Load Balancing</li>"
                                + "<li>AWS Lambda</li></ul>", "back": "<b>AWS Lambda</b> " }
  , { "exam": "SAA-C03", "front": "When you are using an Edge-Optimized API Gateway, your API Gateway lives in CloudFront Edge Locations across all AWS Regions.<ul>"
                                + "<li>False</li>"
                                + "<li>True</li></ul>", "back": "<b>False</b> An Edge-Optimized API Gateway is best for geographically distributed clients. API requests are routed to the nearest CloudFront Edge Location which improves latency. The API Gateway still lives in one AWS Region." }
  , { "exam": "SAA-C03", "front": "You are running an application in production that is leveraging DynamoDB as its datastore and is experiencing smooth sustained usage. There is a need to make the application run in development mode as well, where it will experience the unpredictable volume of requests. What is the most cost-effective solution that you recommend?<ul>"
                                + "<li>Use Provisioned Capacity Mode with Auto Scaling enabled for both development and production</li>"
                                + "<li>Use Provisioned Capacity Mode with Auto Scaling enabled for production and use On-Demand Capacity Mode for development</li>"
                                + "<li>Use Provisioned Capacity Mode with Auto Scaling enabled for development and use On-Demand Capacity Mode for production</li>"
                                + "<li>Use On-Demand Capacity Mode for both development and production</li></ul>", "back": "<b>Use Provisioned Capacity Mode with Auto Scaling enabled for production and use On-Demand Capacity Mode for development</b> " }
  , { "exam": "SAA-C03", "front": "You have an application that is served globally using CloudFront Distribution. You want to authenticate users at the CloudFront Edge Locations instead of authentication requests go all the way to your origins. What should you use to satisfy this requirement?<ul>"
                                + "<li>Lambda@Edge</li>"
                                + "<li>API Gateway</li>"
                                + "<li>DynamoDB</li>"
                                + "<li>AWS Global Accelerator</li></ul>", "back": "<b>Lambda@Edge</b> Lambda@Edge is a feature of CloudFront that lets you run code closer to your users, which improves performance and reduces latency." }
  , { "exam": "SAA-C03", "front": "The maximum size of an item in a DynamoDB table is ...................<ul>"
                                + "<li>1 MB</li>"
                                + "<li>500 KB</li>"
                                + "<li>400 KB</li>"
                                + "<li>400 MB</li></ul>", "back": "<b>400 KB</b> " }
  , { "exam": "SAA-C03", "front": "Which AWS service allows you to build Serverless workflows using AWS services (e.g., Lambda) and supports human approval?<ul>"
                                + "<li>AWS Lambda</li>"
                                + "<li>Amazon ECS</li>"
                                + "<li>AWS Step Functions</li>"
                                + "<li>AWS Storage Gateway</li></ul>", "back": "<b>AWS Step Functions</b> " }
  , { "exam": "SAA-C03", "front": "A company has a serverless application on AWS which consists of Lambda, DynamoDB, and Step Functions. In the last month, there are an increase in the number of requests against the application which results in an increase in DynamoDB costs, and requests started to be throttled. After further investigation, it shows that the majority of requests are read requests against some queries in the DynamoDB table. What do you recommend to prevent throttles and reduce costs efficiently?<ul>"
                                + "<li>Use an EC2 instance with Redis installed and place it between the Lambda function and the DynamoDB table</li>"
                                + "<li>Migrate from DynamoDB to Aurora and use ElastiCache to cache the most requested read data</li>"
                                + "<li>Migrate from DynamoDB to S3 and use CloudFront to cache the most requested read data</li>"
                                + "<li>Use DynamoDB Accelerator (DAX) to cache the most requested read data</li></ul>", "back": "<b>Use DynamoDB Accelerator (DAX) to cache the most requested read data</b> " }
  , { "exam": "SAA-C03", "front": "You are a DevOps engineer in a football company that has a website that is backed by a DynamoDB table. The table stores viewers’ feedback for football matches. You have been tasked to work with the analytics team to generate reports on the viewers’ feedback. The analytics team wants the data in DynamoDB json format and hosted in an S3 bucket to start working on it and create the reports. What is the best and most cost-effective way you can achieve this task?<ul>"
                                + "<li>Select DynamoDB table then select Export to S3</li>"
                                + "<li>Create a Lambda function to read DynamoDB data, convert them to json files, then store the files in S3 bucket</li>"
                                + "<li>Use AWS Transfer Family</li>"
                                + "<li>Use AWS DataSync</li></ul>", "back": "<b>Select DynamoDB table then select Export to S3</b> " }
  , { "exam": "SAA-C03", "front": "A website is currently in the development process and it is going to be hosted on AWS. There is a requirement to store user sessions for users logged in to the website with an automatic expiry and deletion of expired user sessions. Which of the following AWS services are best suited for this use case?<ul>"
                                + "<li>Store users’ sessions in an S3 bucket and enable S3 Lifecycle Policy</li>"
                                + "<li>Store users’ sessions locally in an EC2 instance</li>"
                                + "<li>Store users’ sessions in a DynamoDB table and enable TTL</li>"
                                + "<li>Store users’ sessions in an EFS file system</li></ul>", "back": "<b>Store users’ sessions in a DynamoDB table and enable TTL</b> " }
  , { "exam": "SAA-C03", "front": "You have a mobile application and would like to give your users access to their own personal space in the S3 bucket. How do you achieve that?<ul>"
                                + "<li>Generate IAM user credentials for each of your application's users</li>"
                                + "<li>Use Amazon Cognito Identity Federation</li>"
                                + "<li>Use SAML Identity Federation</li>"
                                + "<li>Use a Bucket Policy to make your bucket public</li></ul>", "back": "<b>Use Amazon Cognito Identity Federation</b> Amazon Cognito can be used to federate mobile user accounts and provide them with their own IAM permissions, so they can be able to access their own personal space in the S3 bucket." }
  , { "exam": "SAA-C03", "front": "You are developing a new web and mobile application that will be hosted on AWS and currently, you are working on developing the login and signup page. The application backend is serverless and you are using Lambda, DynamoDB, and API Gateway. Which of the following is the best and easiest approach to configure the authentication for your backend?<ul>"
                                + "<li>Store users’ credentials in a DynamoDB table encrypted using KMS</li>"
                                + "<li>Store users’ credentials in an S3 bucket encrypted using KMS</li>"
                                + "<li>Use Cognito User Pools</li>"
                                + "<li>Store users’ credentials in AWS Secrets Manager</li></ul>", "back": "<b>Use Cognito User Pools</b> " }
  , { "exam": "SAA-C03", "front": "You are running a mobile application where you want each registered user to upload/download images to/from his own folder in the S3 bucket. Also, you want to give your users to sign-up and sign in using their social media accounts (e.g., Facebook). Which AWS service should you choose?<ul>"
                                + "<li>AWS Identity and Access Management (IAM)</li>"
                                + "<li>AWS IAM Identity Center</li>"
                                + "<li>Amazon Cognito</li>"
                                + "<li>Amazon CloudFront</li></ul>", "back": "<b>Amazon Cognito</b> Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily. Amazon Cognito scales to millions of users and supports sign-in with social identity providers, such as Apple, Facebook, Google, and Amazon, and enterprise identity providers via SAML 2.0 and OpenID Connect." }
  , { "exam": "SAA-C03", "front": "A startup company plans to run its application on AWS. As a solutions architect, the company hired you to design and implement a fully Serverless REST API. Which technology stack do you recommend?<ul>"
                                + "<li>API Gateway + AWS Lambda</li>"
                                + "<li>Application Load Balancer + EC2</li>"
                                + "<li>Elastic Container Service (ECS) + Elastic Block Store (EBS)</li>"
                                + "<li>Amazon CloudFront + S3</li></ul>", "back": "<b>API Gateway + AWS Lambda</b> This is fully serverless." }
  , { "exam": "SAA-C03", "front": "The following AWS services have an out of the box caching feature, EXCEPT .................<ul>"
                                + "<li>API Gateway</li>"
                                + "<li>Lambda</li>"
                                + "<li>DynamoDB</li></ul>", "back": "<b>Lambda</b> Lambda does not have an out-of-the-box caching feature." }
  , { "exam": "SAA-C03", "front": "You have a lot of static files stored in an S3 bucket that you want to distribute globally to your users. Which AWS service should you use?<ul>"
                                + "<li>S3 Cross-Region Replication</li>"
                                + "<li>Amazon CloudFront</li>"
                                + "<li>Amazon Route 53</li>"
                                + "<li>API Gateway</li></ul>", "back": "<b>Amazon CloudFront</b> Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds. This is a perfect use case for Amazon CloudFront." }
  , { "exam": "SAA-C03", "front": "You have created a DynamoDB table in ap-northeast-1 and would like to make it available in eu-west-1, so you decided to create a DynamoDB Global Table. What needs to be enabled first before you create a DynamoDB Global Table?<ul>"
                                + "<li>DynamoDB Streams</li>"
                                + "<li>DynamoDB DAX</li>"
                                + "<li>DynamoDB Versioning</li>"
                                + "<li>DynamoDB Backups</li></ul>", "back": "<b>DynamoDB Streams</b> DynamoDB Streams enable DynamoDB to get a changelog and use that changelog to replicate data across replica tables in other AWS Regions." }
  , { "exam": "SAA-C03", "front": "You have configured a Lambda function to run each time an item is added to a DynamoDB table using DynamoDB Streams. The function is meant to insert messages into the SQS queue for further long processing jobs. Each time the Lambda function is invoked, it seems able to read from the DynamoDB Stream but it isn't able to insert the messages into the SQS queue. What do you think the problem is?<ul>"
                                + "<li>Lambda can't be used to insert messages into the SQS queue, use an EC2 instance instead</li>"
                                + "<li>The Lambda Execution IAM Role is missing permissions</li>"
                                + "<li>The Lambda security group must allow outbound access to SQS</li>"
                                + "<li>The SQS security group must be edited to allow AWS Lambda</li></ul>", "back": "<b>The Lambda Execution IAM Role is missing permissions</b> " }
  , { "exam": "SAA-C03", "front": "You would like to create an architecture for a micro-services application whose sole purpose is to encode videos stored in an S3 bucket and store the encoded videos back into an S3 bucket. You would like to make this micro-services application reliable and has the ability to retry upon failures. Each video may take over 25 minutes to be processed. The services used in the architecture should be asynchronous and should have the capability to be stopped for a day and resume the next day from the videos that haven't been encoded yet. Which of the following AWS services would you recommend in this scenario?<ul>"
                                + "<li>Amazon S3 + AWS Lambda</li>"
                                + "<li>Amazon SNS + Amazon EC2</li>"
                                + "<li>Amazon SQS + Amazon EC2</li>"
                                + "<li>Amazon SQS + AWS Lambda</li></ul>", "back": "<b>Amazon SQS + Amazon EC2</b> Amazon SQS allows you to retain messages for days and process them later, while we can take down our EC2 instances." }
  , { "exam": "SAA-C03", "front": "You are running a photo-sharing website where your images are downloaded from all over the world. Every month you publish a master pack of beautiful mountain images that are over 15 GB in size. The content is currently hosted on an Elastic File System (EFS) file system and distributed by an Application Load Balancer and a set of EC2 instances. Each month, you are experiencing very high traffic which increases the load on your EC2 instances and increases network costs. What do you recommend to reduce EC2 load and network costs without refactoring your website?<ul>"
                                + "<li>Hosts the master pack into S3</li>"
                                + "<li>Enable Application Load Balancer Caching</li>"
                                + "<li>Scale up the EC2 instances</li>"
                                + "<li>Create a CloudFront Distribution</li></ul>", "back": "<b>Create a CloudFront Distribution</b> Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds. Amazon CloudFront can be used in front of an Application Load Balancer." }
  , { "exam": "SAA-C03", "front": "An AWS service allows you to capture gigabytes of data per second in real-time and deliver these data to multiple consuming applications, with a replay feature.<ul>"
                                + "<li>Kinesis Data Streams</li>"
                                + "<li>Amazon S3</li>"
                                + "<li>Amazon MQ</li></ul>", "back": "<b>Kinesis Data Streams</b> Amazon Kinesis Data Streams (KDS) is a massively scalable and durable real-time data streaming service. It can continuously capture gigabytes of data per second from hundreds of sources such as website clickstreams, database event streams, financial transactions, social media feeds, IT logs, and location-tracking events." }
  , { "exam": "SAA-C03", "front": "Which database helps you store relational datasets, with SQL language compatibility and the capability of processing transactions such as insert, update, and delete?<ul>"
                                + "<li>Amazon DocumentDB</li>"
                                + "<li>Amazon RDS</li>"
                                + "<li>Amazon DynamoDB</li>"
                                + "<li>Amazon ElastiCache</li></ul>", "back": "<b>Amazon RDS</b> " }
  , { "exam": "SAA-C03", "front": "Which AWS service provides you with caching capability that is compatible with Redis API?<ul>"
                                + "<li>Amazon RDS</li>"
                                + "<li>Amazon DynamoDB</li>"
                                + "<li>Amazon OpenSearch</li>"
                                + "<li>Amazon ElastiCache</li></ul>", "back": "<b>Amazon ElastiCache</b> Amazon ElastiCache is a fully managed in-memory data store, compatible with Redis or Memcached." }
  , { "exam": "SAA-C03", "front": "You want to migrate an on-premises MongoDB NoSQL database to AWS. You don't want to manage any database servers, so you want to use a managed NoSQL Serverless database, that provides you with high availability, durability, and reliability, and the capability to take your database global. Which database should you choose?<ul>"
                                + "<li>Amazon RDS</li>"
                                + "<li>Amazon DynamoDB</li>"
                                + "<li>Amazon DocumentDB</li>"
                                + "<li>Amazon Aurora</li></ul>", "back": "<b>Amazon DynamoDB</b> Amazon DynamoDB is a key-value, document, NoSQL database." }
  , { "exam": "SAA-C03", "front": "You are looking to perform Online Transaction Processing (OLTP). You would like to use a database that has built-in auto-scaling capabilities and provides you with the maximum number of replicas for its underlying storage. What AWS service do you recommend?<ul>"
                                + "<li>Amazon ElastiCache</li>"
                                + "<li>Amazon Neptune</li>"
                                + "<li>Amazon Aurora</li>"
                                + "<li>Amazon RDS</li></ul>", "back": "<b>Amazon Aurora</b> Amazon Aurora is a MySQL and PostgreSQL-compatible relational database. It features a distributed, fault-tolerant, self-healing storage system that auto-scales up to 128TB per database instance. It delivers high performance and availability with up to 15 low-latency read replicas, point-in-time recovery, continuous backup to Amazon S3, and replication across 3 AZs." }
  , { "exam": "SAA-C03", "front": "As a Solutions Architect, a startup company asked you for help as they are working on an architecture for a social media website where users can be friends with each other, and like each other's posts. The company plan on performing some complicated queries such as 'What are the number of likes on the posts that have been posted by the friends of Mike?'. Which database do you recommend?<ul>"
                                + "<li>Amazon RDS</li>"
                                + "<li>Amazon QLDB</li>"
                                + "<li>Amazon Neptune</li>"
                                + "<li>Amazon OpenSearch</li></ul>", "back": "<b>Amazon Neptune</b> Amazon Neptune is a fast, reliable, fully-managed graph database service that makes it easy to build and run applications that work with highly connected datasets." }
  , { "exam": "SAA-C03", "front": "You have a set of files, 100MB each, that you want to store in a reliable and durable key-value store. Which AWS service do you recommend?<ul>"
                                + "<li>Amazon Aurora</li>"
                                + "<li>Amazon S3</li>"
                                + "<li>Amazon DynamoDB</li>"
                                + "<li>Amazon ElastiCache</li></ul>", "back": "<b>Amazon S3</b> Amazon S3 is indeed a key-value store! (where the key is the full path of the object in the bucket)" }
  , { "exam": "SAA-C03", "front": "A company has an on-premises website that uses ReactJS as its frontend, NodeJS as its backend, and MongoDB for the database. There are some issues with the self-hosted MongoDB database as there is a lot of maintenance required and they don’t have and can’t afford the resources or experience to handle those issues. So, a decision was made to migrate the website to AWS. They have decided to host the frontend ReactJS application in an S3 bucket and the NodeJS backend on a set of EC2 instances. Which AWS service can they use to migrate the MongoDB database that provides them with high scalability and availability without making any code changes?<ul>"
                                + "<li>Amazon ElastiCache</li>"
                                + "<li>Amazon DocumentDB</li>"
                                + "<li>Amazon RDS for MongoDB</li>"
                                + "<li>Amazon Neptune</li></ul>", "back": "<b>Amazon DocumentDB</b> " }
  , { "exam": "SAA-C03", "front": "A company using a self-hosted on-premises Apache Cassandra database which they want to migrate to AWS. Which AWS service can they use which provides them with a fully managed, highly available, and scalable Apache Cassandra database?<ul>"
                                + "<li>Amazon DocumentDB</li>"
                                + "<li>Amazon DynamoDB</li>"
                                + "<li>Amazon Timestream</li>"
                                + "<li>Amazon Keyspaces</li></ul>", "back": "<b>Amazon Keyspaces</b> " }
  , { "exam": "SAA-C03", "front": "A startup is working on developing a new project to reduce forest fires due to climate change. The startup is developing sensors that will be spread across the entire forest to make some readings such as temperature, humidity, and pressures which will help detect the forest fires before it happens. They are going to have thousands of sensors that are going to store a lot of readings each second. There is a requirement to store those readings and do fast analytics so they can predict if there is a fire. Which AWS service can they use to store those readings?<ul>"
                                + "<li>Amazon Timestream</li>"
                                + "<li>Amazon Neptune</li>"
                                + "<li>Amazon S3</li>"
                                + "<li>Amazon ElastiCache</li></ul>", "back": "<b>Amazon Timestream</b> " }
  , { "exam": "SAA-C03", "front": "You would like to have a database that is efficient at performing analytical queries on large sets of columnar data. You would like to connect to this Data Warehouse using a reporting and dashboard tool such as Amazon QuickSight. Which AWS technology do you recommend?<ul>"
                                + "<li>Amazon RDS</li>"
                                + "<li>Amazon S3</li>"
                                + "<li>Amazon Redshift</li>"
                                + "<li>Amazon Neptune</li></ul>", "back": "<b>Amazon Redshift</b> " }
  , { "exam": "SAA-C03", "front": "You have a lot of log files stored in an S3 bucket that you want to perform a quick analysis, if possible Serverless, to filter the logs and find users that attempted to make an unauthorized action. Which AWS service allows you to do so?<ul>"
                                + "<li>Amazon DynamoDB</li>"
                                + "<li>Amazon Redshift</li>"
                                + "<li>S3 Glacier</li>"
                                + "<li>Amazon Athena</li></ul>", "back": "<b>Amazon Athena</b>, because you can run SQL queries on S3 data using Athena" }
  , { "exam": "SAA-C03", "front": "As a Solutions Architect, you have been instructed you to prepare a disaster recovery plan for a Redshift cluster. What should you do?<ul>"
                                + "<li>Enable Multi-AZ</li>"
                                + "<li>Enable Automated Snapshots, then configure your Redshift cluster to automatically copy snapshots to another AWS region</li>"
                                + "<li>Take a snapshot then restore to a Redshift Global cluster</li></ul>", "back": "<b>Enable Automated Snapshots, then configure your Redshift cluster to automatically copy snapshots to another AWS region</b> " }
  , { "exam": "SAA-C03", "front": "Which feature in Redshift forces all COPY and UNLOAD traffic moving between your cluster and data repositories through your VPCs?<ul>"
                                + "<li>Enhanced VPC Routing</li>"
                                + "<li>Improved VPC Routing</li>"
                                + "<li>Redshift Spectrum</li></ul>", "back": "<b>Enhanced VPC Routing</b> " }
  , { "exam": "SAA-C03", "front": "You are running a gaming website that is using DynamoDB as its data store. Users have been asking for a search feature to find other gamers by name, with partial matches if possible. Which AWS technology do you recommend to implement this feature?<ul>"
                                + "<li>Amazon DynamoDB</li>"
                                + "<li>Amazon Redshift</li>"
                                + "<li>Amazon OpenSearch Service</li>"
                                + "<li>Amazon Neptune</li></ul>", "back": "<b>Amazon OpenSearch Service</b> " }
  , { "exam": "SAA-C03", "front": "An AWS service allows you to create, run, and monitor ETL (extract, transform, and load) jobs in a few clicks.<ul>"
                                + "<li>AWS Glue</li>"
                                + "<li>Amazon Redshift</li>"
                                + "<li>Amazon RDS</li>"
                                + "<li>Amazon DynamoDB</li></ul>", "back": "<b>AWS Glue</b> " }
  , { "exam": "SAA-C03", "front": "A company is using AWS to host its public websites and internal applications. Those different websites and applications generate a lot of logs and traces. There is a requirement to centrally store those logs and efficiently search and analyze those logs in real-time for detection of any errors and if there is a threat. Which AWS service can help them efficiently store and analyze logs?<ul>"
                                + "<li>Amazon S3</li>"
                                + "<li>Amazon OpenSearch service</li>"
                                + "<li>Amazon ElastiCache</li>"
                                + "<li>Amazon QLDB</li></ul>", "back": "<b>Amazon OpenSearch service</b> " }
  , { "exam": "SAA-C03", "front": "……………………….. makes it easy and cost-effective for data engineers and analysts to run applications built using open source big data frameworks such as Apache Spark, Hive, or Presto without having to operate or manage clusters.<ul>"
                                + "<li>AWS Lambda</li>"
                                + "<li>Amazon EMR</li>"
                                + "<li>Amazon Athena</li>"
                                + "<li>Amazon OpenSearch Service</li></ul>", "back": "<b>Amazon EMR</b> " }
  , { "exam": "SAA-C03", "front": "An e-commerce company has all its historical data such as orders, customers, revenues, and sales for the previous years hosted on a Redshift cluster. There is a requirement to generate some dashboards and reports indicating the revenues from the previous years and the total sales, so it will be easy to define the requirements for the next year. The DevOps team is assigned to find an AWS service that can help define those dashboards and have native integration with Redshift. Which AWS service is best suited?<ul>"
                                + "<li>Amazon OpenSearch Service</li>"
                                + "<li>Amazon Athena</li>"
                                + "<li>Amazon QuickSight</li>"
                                + "<li>Amazon EMR</li></ul>", "back": "<b>Amazon QuickSight</b> " }
  , { "exam": "SAA-C03", "front": "Which AWS Glue feature allows you to save and track the data that has already been processed during a previous run of a Glue ETL job?<ul>"
                                + "<li>Glue Job Bookmarks</li>"
                                + "<li>Glue Elastic Views</li>"
                                + "<li>Glue Streaming ETL</li>"
                                + "<li>Glue DataBrew</li></ul>", "back": "<b>Glue Job Bookmarks</b> " }
  , { "exam": "SAA-C03", "front": "You are a DevOps engineer in a machine learning company which 3 TB of JSON files stored in an S3 bucket. There’s a requirement to do some analytics on those files using Amazon Athena and you have been tasked to find a way to convert those files’ format from JSON to Apache Parquet. Which AWS service is best suited?<ul>"
                                + "<li>S3 Object Versioning</li>"
                                + "<li>Kinesis Data Streams</li>"
                                + "<li>Amazon MSK</li>"
                                + "<li>AWS Glue</li></ul>", "back": "<b>AWS Glue</b> " }
  , { "exam": "SAA-C03", "front": "You have an on-premises application that is used together with an on-premises Apache Kafka to receive a stream of clickstream events from multiple websites. You have been tasked to migrate this application as soon as possible without any code changes. You decided to host the application on an EC2 instance. What is the best option you recommend to migrate Apache Kafka?<ul>"
                                + "<li>Kinesis Data Streams</li>"
                                + "<li>AWS Glue</li>"
                                + "<li>Amazon MSK</li>"
                                + "<li>Kinesis Data Analytics</li></ul>", "back": "<b>Amazon MSK</b> " }
  , { "exam": "SAA-C03", "front": "You have data stored in RDS, S3 buckets and you are using AWS Lake Formation as a data lake to collect, move and catalog data so you can do some analytics. You have a lot of big data and ML engineers in the company and you want to control access to part of the data as it might contain sensitive information. What can you use?<ul>"
                                + "<li>Lake Formation Fine-grained Access Control</li>"
                                + "<li>Amazon Cognito</li>"
                                + "<li>AWS Shield</li>"
                                + "<li>S3 Object Lock</li></ul>", "back": "<b>Lake Formation Fine-grained Access Control</b> " }
  , { "exam": "SAA-C03", "front": "Which AWS service is most appropriate when you want to perform real-time analytics on streams of data?<ul>"
                                + "<li>Amazon SQS</li>"
                                + "<li>Amazon SNS</li>"
                                + "<li>Amazon Kinesis Data Analytics</li>"
                                + "<li>Amazon Kinesis Data Firehose</li></ul>", "back": "<b>Amazon Kinesis Data Analytics</b> Use Kinesis Data Analytics with Kinesis Data Streams as the underlying source of data." }
  , { "exam": "SAA-C03", "front": "You should use Amazon Transcribe to turn text into lifelike speech using deep learning.<ul>"
                                + "<li>True</li>"
                                + "<li>False</li></ul>", "back": "<b>False</b> Amazon Transcribe is an AWS service that makes it easy for customers to convert speech-to-text. Amazon Polly is a service that turns text into lifelike speech." }
  , { "exam": "SAA-C03", "front": "A company would like to implement a chatbot that will convert speech-to-text and recognize the customers' intentions. What service should it use?<ul>"
                                + "<li>Transcribe</li>"
                                + "<li>Rekognition</li>"
                                + "<li>Connect</li>"
                                + "<li>Lex</li></ul>", "back": "<b>Lex</b> Amazon Lex is a service for building conversational interfaces into any application using voice and text. Lex provides the advanced deep learning functionalities of automatic speech recognition (ASR) for converting speech to text, and natural language understanding (NLU) to recognize the intent of the text, to enable you to build applications with highly engaging user experiences and lifelike conversational interactions." }
  , { "exam": "SAA-C03", "front": "You would like to find objects, people, text, or scenes in images and videos. What AWS service should you use?<ul>"
                                + "<li>Rekognition</li>"
                                + "<li>Polly</li>"
                                + "<li>Kendra</li>"
                                + "<li>Lex</li></ul>", "back": "<b>Rekognition</b> Amazon Rekognition makes it easy to add image and video analysis to your applications using proven, highly scalable, deep learning technology that requires no machine learning expertise to use." }
  , { "exam": "SAA-C03", "front": "A start-up would like to rapidly create customized user experiences. Which AWS service can help?<ul>"
                                + "<li>Personalize</li>"
                                + "<li>Kendra</li>"
                                + "<li>Connect</li></ul>", "back": "<b>Personalize</b> Amazon Personalize is a machine learning service that makes it easy for developers to create individualized recommendations for customers using their applications." }
  , { "exam": "SAA-C03", "front": "A research team would like to group articles by topics using Natural Language Processing (NLP). Which service should they use?<ul>"
                                + "<li>Translate</li>"
                                + "<li>Comprehend</li>"
                                + "<li>Lex</li>"
                                + "<li>Rekognition</li></ul>", "back": "<b>Comprehend</b> Amazon Comprehend is a natural language processing (NLP) service that uses machine learning to find meaning and insights in text." }
  , { "exam": "SAA-C03", "front": "A company would like to convert its documents into different languages, with natural and accurate wording. What should they use?<ul>"
                                + "<li>Transcribe</li>"
                                + "<li>Polly</li>"
                                + "<li>Translate</li>"
                                + "<li>WordTranslator</li></ul>", "back": "<b>Translate</b> Amazon Translate is a neural machine translation service that delivers fast, high-quality, and affordable language translation." }
  , { "exam": "SAA-C03", "front": "A developer would like to build, train, and deploy a machine learning model quickly. Which service can he use?<ul>"
                                + "<li>SageMaker</li>"
                                + "<li>Polly</li>"
                                + "<li>Comprehend</li>"
                                + "<li>Personalize</li></ul>", "back": "<b>SageMaker</b> Amazon SageMaker is a fully managed service that provides every developer and data scientist with the ability to build, train, and deploy machine learning (ML) models quickly. SageMaker removes the heavy lifting from each step of the machine learning process to make it easier to develop high quality models." }
  , { "exam": "SAA-C03", "front": "Which AWS service makes it easy to convert speech-to-text?<ul>"
                                + "<li>Connect</li>"
                                + "<li>Translate</li>"
                                + "<li>Transcribe</li>"
                                + "<li>Polly</li></ul>", "back": "<b>Transcribe</b> Amazon Transcribe is an AWS service that makes it easy for customers to convert speech-to-text." }
  , { "exam": "SAA-C03", "front": "Which of the following services is a document search service powered by machine learning?<ul>"
                                + "<li>Translate</li>"
                                + "<li>Kendra</li>"
                                + "<li>Comprehend</li>"
                                + "<li>Polly</li></ul>", "back": "<b>Kendra</b> Amazon Kendra is a highly accurate and easy to use enterprise search service that’s powered by machine learning." }
  , { "exam": "SAA-C03", "front": "A company is managing an image and video sharing platform which is used by customers around the globe. The platform is running on AWS using an S3 bucket to host both images and videos and using CloudFront as the CDN to deliver content to customers all over the world with low latency. In the last couple of months, a lot of customers have complained that they have started to see inappropriate content on the platform which started to increase in the last week. It will be very expensive and time-consuming to manually approve those images and videos by employees before its published on the platform. There is a requirement to find a solution that can automatically detect inappropriate and offensive images and videos and give you the ability to set a minimum confidence threshold for items that will be flagged and allows for manual review. Which AWS service can fit the requirement?<ul>"
                                + "<li>Amazon Polly</li>"
                                + "<li>Amazon Translate</li>"
                                + "<li>Amazon Lex</li>"
                                + "<li>Amazon Rekognition</li></ul>", "back": "<b>Amazon Rekognition</b> " }
  , { "exam": "SAA-C03", "front": "An online medical company that allows you to book an appointment with doctors using through a phone call is using AWS to host their infrastructure. They are using Amazon Connect and Amazon Lex to receive calls and create a workflow, book an appointment, and pay. According to the company’s policy, all calls must be recorded for review. But, there is a requirement to remove any Personally Identifiable Information (PII) from the call before it's saved. What do you recommend to use which helps in removing PII from calls?<ul>"
                                + "<li>Amazon Polly</li>"
                                + "<li>Amazon Transcribe</li>"
                                + "<li>Amazon Recognition</li>"
                                + "<li>Amazon Translate</li></ul>", "back": "<b>Amazon Transcribe</b> " }
  , { "exam": "SAA-C03", "front": "Amazon Polly allows you to turn text into speech. It has two important features. First is ……………….. which allows you to customize the pronunciation of words (e.g., “Amazon EC2” will be “Amazon Elastic Compute Cloud”). The second is ……………….. which allows you to emphasize words, including breathing sounds, whispering, and more.<ul>"
                                + "<li>Speech Synthesis Markup Language (SSML), Pronunciation Lexicons</li>"
                                + "<li>Pronunciation Lexicons, Security Assertion Markup Language (SAML)</li>"
                                + "<li>Pronunciation Lexicons, Speech Synthesis Markup Language (SSML)</li>"
                                + "<li>Security Assertion Markup Language (SAML), Pronunciation Lexicons</li></ul>", "back": "<b>Pronunciation Lexicons, Speech Synthesis Markup Language (SSML)</b> " }
  , { "exam": "SAA-C03", "front": "A medical company is in the process of implementing a solution to detect, extract, and analyze information from unstructured medical text like doctors’ notes, clinical trial reports, and radiology reports. Those documents are uploaded and stored on S3 buckets. According to the company’s regulations, the solution must be designed and implemented to keep patients’ privacy by identifying Protected Health Information (PHI) so the solution will be eligible with HIPAA. Which AWS service should you use?<ul>"
                                + "<li>Amazon Comprehend Medical</li>"
                                + "<li>Amazon Rekognition</li>"
                                + "<li>Amazon Polly</li>"
                                + "<li>Amazon Translate</li></ul>", "back": "<b>Amazon Comprehend Medical</b> " }
  , { "exam": "SAA-C03", "front": "You have an RDS DB instance that's configured to push its database logs to CloudWatch. You want to create a CloudWatch alarm if there's an Error found in the logs. How would you do that?<ul>"
                                + "<li>Create a scheduled CloudWatch Event that triggers an AWS Lambda every 1 hour, scans the logs, and notify you through SNS topic</li>"
                                + "<li>Create a CloudWatch Logs Metric Filter that filter the logs for the keyword Error, then create a CloudWatch Alarm based on that Metric Filter</li>"
                                + "<li>Create an AWS Config Rule that monitors Error in your database logs and notify you through SNS topic</li></ul>", "back": "<b>Create a CloudWatch Logs Metric Filter that filter the logs for the keyword Error, then create a CloudWatch Alarm based on that Metric Filter</b> " }
  , { "exam": "SAA-C03", "front": "You have an application hosted on a fleet of EC2 instances managed by an Auto Scaling Group that you configured its minimum capacity to 2. Also, you have created a CloudWatch Alarm that is configured to scale in your ASG when CPU Utilization is below 60%. Currently, your application runs on 2 EC2 instances and has low traffic and the CloudWatch Alarm is in the ALARM state. What will happen?<ul>"
                                + "<li>One EC2 instance will be terminated and the ASG desired and minimum capacity will go to 1</li>"
                                + "<li>The CloudWatch Alarm will remain in ALARM state but never decrease the number of EC2 instances in the ASG</li>"
                                + "<li>The CloudWatch Alarm will be detached from my ASG</li>"
                                + "<li>The CloudWatch Alarm will go in OK state</li></ul>", "back": "<b>The CloudWatch Alarm will remain in ALARM state but never decrease the number of EC2 instances in the ASG</b> The number of EC2 instances in an ASG can not go below the minimum capacity, even if the CloudWatch alarm would in theory trigger an EC2 instance termination." }
  , { "exam": "SAA-C03", "front": "How would you monitor your EC2 instance memory usage in CloudWatch?<ul>"
                                + "<li>Enable EC2 Detailed Monitoring</li>"
                                + "<li>By default, the EC2 instance pushes memory usage to CloudWatch</li>"
                                + "<li>Use the Unified CloudWatch Agent to push memory usage as a custom metric to CloudWatch</li></ul>", "back": "<b>Use the Unified CloudWatch Agent to push memory usage as a custom metric to CloudWatch</b> " }
  , { "exam": "SAA-C03", "front": "You have made a configuration change and would like to evaluate the impact of it on the performance of your application. Which AWS service should you use?<ul>"
                                + "<li>Amazon CloudWatch</li>"
                                + "<li>AWS CloudTrail</li></ul>", "back": "<b>Amazon CloudWatch</b> Amazon CloudWatch is a monitoring service that allows you to monitor your applications, respond to system-wide performance changes, optimize resource utilization, and get a unified view of operational health. It is used to monitor your applications' performance and metrics." }
  , { "exam": "SAA-C03", "front": "Someone has terminated an EC2 instance in your AWS account last week, which was hosting a critical database that contains sensitive data. Which AWS service helps you find who did that and when?<ul>"
                                + "<li>CloudWatch Metrics</li>"
                                + "<li>CloudWatch Alarms</li>"
                                + "<li>CloudWatch Events</li>"
                                + "<li>AWS CloudTrail</li></ul>", "back": "<b>AWS CloudTrail</b> AWS CloudTrail allows you to log, continuously monitor, and retain account activity related to actions across your AWS infrastructure. It provides the event history of your AWS account activity, audit API calls made through the AWS Management Console, AWS SDKs, AWS CLI. So, the EC2 instance termination API call will appear here. You can use CloudTrail to detect unusual activity in your AWS accounts." }
  , { "exam": "SAA-C03", "front": "You have CloudTrail enabled for your AWS Account in all AWS Regions. What should you use to detect unusual activity in your AWS Account?<ul>"
                                + "<li>CloudTrail Data Events</li>"
                                + "<li>CloudTrail Insights</li>"
                                + "<li>CloudTrail Management Events</li></ul>", "back": "<b>CloudTrail Insights</b> " }
  , { "exam": "SAA-C03", "front": "One of your teammates terminated an EC2 instance 4 months ago which has critical data. You don't know who made this so you are going to review all API calls within this period using CloudTrail. You already have CloudTrail set up and configured to send logs to the S3 bucket. What should you do to find out who made this?<ul>"
                                + "<li>Use CloudTrail Event History in CloudTrail Console</li>"
                                + "<li>Analyze CloudTrail logs in S3 bucket using Amazon Athena</li></ul>", "back": "<b>Analyze CloudTrail logs in S3 bucket using Amazon Athena</b> You can use the CloudTrail Console to view the last 90 days of recorded API activity. For events older than 90 days, use Athena to analyze CloudTrail logs stored in S3." }
  , { "exam": "SAA-C03", "front": "You are running a website on a fleet of EC2 instances with OS that has a known vulnerability on port 84. You want to continuously monitor your EC2 instances if they have port 84 exposed. How should you do this?<ul>"
                                + "<li>Setup CloudWatch Metrics</li>"
                                + "<li>Setup CloudTrail Trails</li>"
                                + "<li>Setup Config Rules</li>"
                                + "<li>Schedule a CloudWatch Event to trigger a Lambda function to scan your EC2 instances</li></ul>", "back": "<b>Setup Config Rules</b> " }
  , { "exam": "SAA-C03", "front": "You would like to evaluate the compliance of your resource's configurations over time. Which AWS service will you choose?<ul>"
                                + "<li>AWS Config</li>"
                                + "<li>Amazon CloudWatch</li>"
                                + "<li>AWS CloudTrail</li></ul>", "back": "<b>AWS Config</b> " }
  , { "exam": "SAA-C03", "front": "Someone changed the configuration of a resource and made it non-compliant. Which AWS service is responsible for logging who made modifications to resources?<ul>"
                                + "<li>Amazon CloudWatch</li>"
                                + "<li>AWS CloudTrail</li>"
                                + "<li>AWS Config</li></ul>", "back": "<b>AWS CloudTrail</b> " }
  , { "exam": "SAA-C03", "front": "You have enabled AWS Config to monitor Security Groups if there's unrestricted SSH access to any of your EC2 instances. Which AWS Config feature can you use to automatically re-configure your Security Groups to their correct state?<ul>"
                                + "<li>AWS Config Remediations</li>"
                                + "<li>AWS Config Rules</li>"
                                + "<li>AWS Config Notifications</li></ul>", "back": "<b>AWS Config Remediations</b> " }
  , { "exam": "SAA-C03", "front": "You are running a critical website on a set of EC2 instances with a tightened Security Group that has restricted SSH access. You have enabled AWS Config in your AWS Region and you want to be notified via email when someone modified your EC2 instances' Security Group. Which AWS Config feature helps you do this?<ul>"
                                + "<li>AWS Config Remediations</li>"
                                + "<li>AWS Config Rules</li>"
                                + "<li>AWS Config Notifications</li></ul>", "back": "<b>AWS Config Notifications</b> " }
  , { "exam": "SAA-C03", "front": "…………………………. is a CloudWatch feature that allows you to send CloudWatch metrics in near real-time to S3 bucket (through Kinesis Data Firehose) and 3rd party destinations (e.g., Splunk, Datadog, …).<ul>"
                                + "<li>CloudWatch Metric Stream</li>"
                                + "<li>CloudWatch Log Stream</li>"
                                + "<li>CloudWatch Metric Filter</li>"
                                + "<li>CloudWatch Log Group</li></ul>", "back": "<b>CloudWatch Metric Stream</b> " }
  , { "exam": "SAA-C03", "front": "A DevOps engineer is working for a company and managing its infrastructure and resources on AWS. There was a sudden spike in traffic for the main application for the company which was not normal in this period of the year. The application is hosted on a couple of EC2 instances in private subnets and is fronted by an Application Load Balancer in a public subnet. To detect if this is normal traffic or an attack, the DevOps engineer enabled the VPC Flow Logs for the subnets and stored those logs in CloudWatch Log Group. The DevOps wants to analyze those logs and find out the top IP addresses making requests against the website to check if there is an attack. Which of the following can help the DevOps engineer to analyze those logs?<ul>"
                                + "<li>CloudWatch Metric Stream</li>"
                                + "<li>CloudWatch Alarm</li>"
                                + "<li>CloudWatch Contributor Insights</li>"
                                + "<li>CloudWatch Metric Filter</li></ul>", "back": "<b>CloudWatch Contributor Insights</b> " }
  , { "exam": "SAA-C03", "front": "A company is developing a Serverless application on AWS using Lambda, DynamoDB, and Cognito. A junior developer joined a few weeks ago and accidentally deleted one of the DynamoDB tables in the dev AWS account which contained important data. The CTO asks you to prevent this from happening again and there must be a notification system to monitor if there is an attempt to make such deletion actions for the DynamoDB tables. What would you do?<ul>"
                                + "<li>Assign developers to a certain IAM group which prevents deletion of DynamoDB tables. Configure EventBridge to capture any DeleteTable API calls through S3 and send a notification using KMS</li>"
                                + "<li>Assign developers to a certain IAM group which prevents deletion of DynamoDB tables. Configure EventBridge to capture any DeleteTable API calls through CloudTrail and send a notification using SNS</li>"
                                + "<li>Assign developers to a certain IAM group which prevents deletion of DynamoDB tables. Configure EventBridge to capture any DeleteTable API calls through CloudTrail and send a notification using KMS</li></ul>", "back": "<b>Assign developers to a certain IAM group which prevents deletion of DynamoDB tables. Configure EventBridge to capture any DeleteTable API calls through CloudTrail and send a notification using SNS</b> " }
  , { "exam": "SAA-C03", "front": "A company has a running Serverless application on AWS which uses EventBridge as an inter-communication channel between different services within the application. There is a requirement to use the events in the prod environment in the dev environment to make some tests. The tests will be done every 6 months, so the events need to be stored and used later on. What is the most efficient and cost-effective way to store EventBridge events and use them later?<ul>"
                                + "<li>Use EventBridge Archive and Replay feature</li>"
                                + "<li>Create a Lambda function to store the EventBridge events in an S3 bucket for later usage</li>"
                                + "<li>Configure EventBridge to store events in a DynamoDB table</li></ul>", "back": "<b>Use EventBridge Archive and Replay feature</b> " }
  , { "exam": "SAA-C03", "front": "You have strong regulatory requirements to only allow fully internally audited AWS services in production. You still want to allow your teams to experiment in a development environment while services are being audited. How can you best set this up?<ul>"
                                + "<li>Provide the Dev team with a completely independent AWS account</li>"
                                + "<li>Apply a global IAM policy on your Prod account</li>"
                                + "<li>Create an AWS Organization and create two Prod and Dev OUs, then Apply an SCP on the Prod OU</li>"
                                + "<li>Create an AWS Config Rule</li></ul>", "back": "<b>Create an AWS Organization and create two Prod and Dev OUs, then Apply an SCP on the Prod OU</b> " }
  , { "exam": "SAA-C03", "front": "You are managing the AWS account for your company, and you want to give one of the developers access to read files from an S3 bucket. You have updated the bucket policy to this, but he still can't access the files in the bucket. What is the problem?<pre>\n{\n  'Version': '2012-10-17',\n  'Statement': [{\n    'Sid': 'AllowsRead',\n    'Effect': 'Allow',\n    'Principal': {\n      'AWS': 'arn:aws:iam::123456789012:user/Dave'\n    },\n    'Action': 's3:GetObject',\n    'Resource': 'arn:aws:s3:::static-files-bucket-xxx'\n  }]\n}</pre><ul>"
                                + "<li>Everything is okay, he just needs to logout and login again</li>"
                                + "<li>The bucket does not contain any files yet</li>"
                                + "<li>You should change the resource to arn:aws:s3:::static-files-bucket-xxx/*, because this is an object-level permission</li></ul>", "back": "<b>You should change the resource to arn:aws:s3:::static-files-bucket-xxx/*, because this is an object-level permission</b> " }
  , { "exam": "SAA-C03", "front": "You have 5 AWS Accounts that you manage using AWS Organizations. You want to restrict access to certain AWS services in each account. How should you do that?<ul>"
                                + "<li>Using IAM Roles</li>"
                                + "<li>Using AWS Organizations SCP</li>"
                                + "<li>Using AWS Config</li></ul>", "back": "<b>Using AWS Organizations SCP</b> " }
  , { "exam": "SAA-C03", "front": "Which of the following IAM condition key you can use only to allow API calls to a specified AWS region?<ul>"
                                + "<li>aws:RequiredRegion</li>"
                                + "<li>aws:SourceRegion</li>"
                                + "<li>aws:InitialRegion</li>"
                                + "<li>aws:RequestedRegion</li></ul>", "back": "<b>aws:RequestedRegion</b> " }
  , { "exam": "SAA-C03", "front": "When configuring permissions for EventBridge to configure a Lambda function as a target you should use ………………….. but when you want to configure a Kinesis Data Streams as a target you should use …………………..<ul>"
                                + "<li>Identity-Based Policy, Resource-based Policy</li>"
                                + "<li>Resource-Based Policy, Identity-based Policy</li>"
                                + "<li>Identity-Based Policy, Identity-Based Policy</li>"
                                + "<li>Resource-based Policy, Resource-based Policy</li></ul>", "back": "<b>Resource-Based Policy, Identity-based Policy</b> " }
  , { "exam": "SAA-C03", "front": "To enable In-flight Encryption (In-Transit Encryption), we need to have ........................<ul>"
                                + "<li>an HTTP endpoint with an SSL certificate</li>"
                                + "<li>an HTTPS endpoint with an SSL certificate</li>"
                                + "<li>a TCP endpoint</li></ul>", "back": "<b>an HTTPS endpoint with an SSL certificate</b> In-flight Encryption = HTTPS, and HTTPS can not be enabled without an SSL certificate." }
  , { "exam": "SAA-C03", "front": "Server-Side Encryption means that the data is sent encrypted to the server.<ul>"
                                + "<li>True</li>"
                                + "<li>False</li></ul>", "back": "<b>False</b> Server-Side Encryption means the server will encrypt the data for us. We don't need to encrypt it beforehand." }
  , { "exam": "SAA-C03", "front": "In Server-Side Encryption, where do the encryption and decryption happen?<ul>"
                                + "<li>Both Encryption and Decryption happen on the server</li>"
                                + "<li>Both Encryption and Decryption happen on the client</li>"
                                + "<li>Encryption happens on the server and Decryption happens on the client</li>"
                                + "<li>Encryption happens on the client and Decryption happens on the server</li></ul>", "back": "<b>Both Encryption and Decryption happen on the server</b> In Server-Side Encryption, we can't do encryption/decryption ourselves as we don't have access to the corresponding encryption key." }
  , { "exam": "SAA-C03", "front": "In Client-Side Encryption, the server must know our encryption scheme before we can upload the data.<ul>"
                                + "<li>False</li>"
                                + "<li>True</li></ul>", "back": "<b>False</b> With Client-Side Encryption, the server doesn't need to know any information about the encryption scheme being used, as the server will not perform any encryption or decryption operations." }
  , { "exam": "SAA-C03", "front": "You need to create KMS Keys in AWS KMS before you are able to use the encryption features for EBS, S3, RDS ...<ul>"
                                + "<li>True</li>"
                                + "<li>False</li></ul>", "back": "<b>False</b> You can use the AWS Managed Service keys in KMS, therefore we don't need to create our own KMS keys." }
  , { "exam": "SAA-C03", "front": "AWS KMS supports both symmetric and asymmetric KMS keys.<ul>"
                                + "<li>True</li>"
                                + "<li>False</li></ul>", "back": "<b>True</b> KMS keys can be symmetric or asymmetric. A symmetric KMS key represents a 256-bit key used for encryption and decryption. An asymmetric KMS key represents an RSA key pair used for encryption and decryption or signing and verification, but not both. Or it represents an elliptic curve (ECC) key pair used for signing and verification." }
  , { "exam": "SAA-C03", "front": "When you enable Automatic Rotation on your KMS Key, the backing key is rotated every .................<ul>"
                                + "<li>90 days</li>"
                                + "<li>1 year</li>"
                                + "<li>2 years</li>"
                                + "<li>3 years</li></ul>", "back": "<b>1 year</b> " }
  , { "exam": "SAA-C03", "front": "You have an AMI that has an encrypted EBS snapshot using KMS CMK. You want to share this AMI with another AWS account. You have shared the AMI with the desired AWS account, but the other AWS account still can't use it. How would you solve this problem?<ul>"
                                + "<li>The other AWS account needs to logout and login again to refresh its credentials</li>"
                                + "<li>You need to share the KMS CMK used to encrypt the AMI with the other AWS account</li>"
                                + "<li>You can't share an AMI that has an encrypted EBS snapshot</li></ul>", "back": "<b>You need to share the KMS CMK used to encrypt the AMI with the other AWS account</b> " }
  , { "exam": "SAA-C03", "front": "You have created a Customer-managed CMK in KMS that you use to encrypt both S3 buckets and EBS snapshots. Your company policy mandates that your encryption keys be rotated every 6 months. What should you do?<ul>"
                                + "<li>Re-configure your KMS CMK and enable Automatic Key Rotation, and configure the Retention Period with 180 days</li>"
                                + "<li>Use AWS Managed Keys as they are automatically rotated by AWS every 3 months</li>"
                                + "<li>Rotate the KMS CMK manually. Create a new KMS CMK and use Key Aliases to reference the new KMS CMK. Keep the old KMS CMK so you can decrypt the old data</li></ul>", "back": "<b>Re-configure your KMS CMK and enable Automatic Key Rotation, and configure the Retention Period with 180 days</b> " }
  , { "exam": "SAA-C03", "front": "What should you use to control access to your KMS CMKs?<ul>"
                                + "<li>KMS Key Policies</li>"
                                + "<li>KMS IAM Policy</li>"
                                + "<li>AWS GuardDuty</li>"
                                + "<li>KMS Access Control List (KMS ACL)</li></ul>", "back": "<b>KMS Key Policies</b> " }
  , { "exam": "SAA-C03", "front": "You have a Lambda function used to process some data in the database. You would like to give your Lambda function access to the database password. Which of the following options is the most secure?<ul>"
                                + "<li>Embed it in the code</li>"
                                + "<li>Have it as a plaintext environment variable</li>"
                                + "<li>Have it as an encrypted environment variable and decrypt it at runtime</li></ul>", "back": "<b>Have it as an encrypted environment variable and decrypt it at runtime</b> This is the most secure solution amongst these options." }
  , { "exam": "SAA-C03", "front": "You have a secret value that you use for encryption purposes, and you want to store and track the values of this secret over time. Which AWS service should you use?<ul>"
                                + "<li>AWS KMS Versioning feature</li>"
                                + "<li>SSM Parameter Store</li>"
                                + "<li>Amazon S3</li></ul>", "back": "<b>SSM Parameter Store</b> SSM Parameters Store can be used to store secrets and has built-in version tracking capability. Each time you edit the value of a parameter, SSM Parameter Store creates a new version of the parameter and retains the previous versions. You can view the details, including the values, of all versions in a parameter's history." }
  , { "exam": "SAA-C03", "front": "Your user-facing website is a high-risk target for DDoS attacks and you would like to get 24/7 support in case they happen and AWS bill reimbursement for the incurred costs during the attack. What AWS service should you use?<ul>"
                                + "<li>AWS WAF</li>"
                                + "<li>AWS Shield Advanced</li>"
                                + "<li>AWS Shield</li>"
                                + "<li>AWS DDoS OpsTeam</li></ul>", "back": "<b>AWS Shield Advanced</b> " }
  , { "exam": "SAA-C03", "front": "You would like to externally maintain the configuration values of your main database, to be picked up at runtime by your application. What's the best place to store them to maintain control and version history?<ul>"
                                + "<li>Amazon DynamoDB</li>"
                                + "<li>Amazon S3</li>"
                                + "<li>Amazon EBS</li>"
                                + "<li>SSM Parameter Store</li></ul>", "back": "<b>SSM Parameter Store</b> " }
  , { "exam": "SAA-C03", "front": "AWS GuardDuty scans the following data sources, EXCEPT ................<ul>"
                                + "<li>CloudTrail Logs</li>"
                                + "<li>VPC Flow Logs</li>"
                                + "<li>DNS Logs</li>"
                                + "<li>CloudWatch Logs</li></ul>", "back": "<b>CloudWatch Logs</b> " }
  , { "exam": "SAA-C03", "front": "You have a website hosted on a fleet of EC2 instances fronted by an Application Load Balancer. What should you use to protect your website from common web application attacks (e.g., SQL Injection)?<ul>"
                                + "<li>AWS Shield</li>"
                                + "<li>AWS WAF</li>"
                                + "<li>AWS Security Hub</li>"
                                + "<li>AWS GuardDuty</li></ul>", "back": "<b>AWS WAF</b> " }
  , { "exam": "SAA-C03", "front": "You would like to analyze OS vulnerabilities from within EC2 instances. You need these analyses to occur weekly and provide you with concrete recommendations in case vulnerabilities are found. Which AWS service should you use?<ul>"
                                + "<li>AWS Shield</li>"
                                + "<li>Amazon GuardDuty</li>"
                                + "<li>Amazon Inspector</li>"
                                + "<li>AWS Config</li></ul>", "back": "<b>Amazon Inspector</b> because it is designed to analyze vulnerabilities in your EC2 instances and can generate actionable recommendations." }
  , { "exam": "SAA-C03", "front": "What is the most suitable AWS service for storing RDS DB passwords which also provides you automatic rotation?<ul>"
                                + "<li>AWS Secrets Manager</li>"
                                + "<li>AWS KMS</li>"
                                + "<li>AWS SSM Parameter Store</li></ul>", "back": "<b>AWS Secrets Manager</b> " }
  , { "exam": "SAA-C03", "front": "Which AWS service allows you to centrally manage EC2 Security Groups and AWS Shield Advanced across all AWS accounts in your AWS Organization?<ul>"
                                + "<li>AWS Shield</li>"
                                + "<li>AWS GuardDuty</li>"
                                + "<li>AWS Config</li>"
                                + "<li>AWS Firewall Manager</li></ul>", "back": "<b>AWS Firewall Manager</b> AWS Firewall Manager is a security management service that allows you to centrally configure and manage firewall rules across your accounts and applications in AWS Organizations. It is integrated with AWS Organizations so you can enable AWS WAF rules, AWS Shield Advanced protection, security groups, AWS Network Firewall rules, and Amazon Route 53 Resolver DNS Firewall rules." }
  , { "exam": "SAA-C03", "front": "Which AWS service helps you protect your sensitive data stored in S3 buckets?<ul>"
                                + "<li>Amazon GuardDuty</li>"
                                + "<li>Amazon Shield</li>"
                                + "<li>Amazon Macie</li>"
                                + "<li>AWS KMS</li></ul>", "back": "<b>Amazon Macie</b> Amazon Macie is a fully managed data security service that uses Machine Learning to discover and protect your sensitive data stored in S3 buckets. It automatically provides an inventory of S3 buckets including a list of unencrypted buckets, publicly accessible buckets, and buckets shared with other AWS accounts. It allows you to identify and alert you to sensitive data, such as Personally Identifiable Information (PII)." }
  , { "exam": "SAA-C03", "front": "An online-payment company is using AWS to host its infrastructure. The frontend is created using VueJS and is hosted on an S3 bucket and the backend is developed using PHP and is hosted on EC2 instances in an Auto Scaling Group. As their customers are worldwide, they use both CloudFront and Aurora Global database to implement multi-region deployments to provide the lowest latency and provide availability, and resiliency. A new feature required which gives customers the ability to store data encrypted on the database and this data must not be disclosed even by the company admins. The data should be encrypted on the client side and stored in an encrypted format. What do you recommend to implement this?<ul>"
                                + "<li>Using Aurora Client-side Encryption and KMS Multi-region Keys</li>"
                                + "<li>Using Lambda Client-side Encryption and KMS Multi-region Keys</li>"
                                + "<li>Using Aurora Client-side Encryption and CloudHSM</li>"
                                + "<li>Using Lambda Client-side Encryption and CloudHSM</li></ul>", "back": "<b>Using Aurora Client-side Encryption and KMS Multi-region Keys</b> " }
  , { "exam": "SAA-C03", "front": "You have an S3 bucket that is encrypted with SSE-KMS. You have been tasked to replicate the objects to a target bucket in the same AWS region but with a different KMS Key. You have configured the S3 replication, the target bucket, and the target KMS key and it is still not working. What is missing to make the S3 replication work?<ul>"
                                + "<li>This is not a supported feature</li>"
                                + "<li>You have to raise a support ticket for AWS to start this replication process for you</li>"
                                + "<li>You have to configure permissions for both Source KMS Key kms:Decrypt and Target KMS Key kms:Encrypt to be used by the S3 Replication Service</li>"
                                + "<li>The source KMS Key and the target KMS key must be the same</li></ul>", "back": "<b>You have to configure permissions for both Source KMS Key kms:Decrypt and Target KMS Key kms:Encrypt to be used by the S3 Replication Service</b> " }
  , { "exam": "SAA-C03", "front": "You have generated a public certificate using LetsEncrypt and uploaded it to the ACM so you can use and attach to an Application Load Balancer that forwards traffic to EC2 instances. As this certificate is generated outside of AWS, it does not support the automatic renewal feature. How would you be notified 30 days before this certificate expires so you can manually generate a new one?<ul>"
                                + "<li>Configure ACM to send notifications by linking it to 3rd party certificate provider LetsEncrypt</li>"
                                + "<li>Configure EventBridge for Daily Expiration Events from ACM to invoke SNS notifications to your email</li>"
                                + "<li>Configure EventBridge for Monthly Expiration Events from ACM to invoke SNS notifications to your email</li>"
                                + "<li>Configure CloudWatch Alarms for Daily Expiration Events from ACM to invoke SNS notifications to your email</li></ul>", "back": "<b>Configure EventBridge for Daily Expiration Events from ACM to invoke SNS notifications to your email</b> " }
  , { "exam": "SAA-C03", "front": "You have created the main Edge-Optimized API Gateway in us-west-2 AWS region. This main Edge-Optimized API Gateway forwards traffic to the second level API Gateway in ap-southeast-1. You want to secure the main API Gateway by attaching an ACM certificate to it. Which AWS region are you going to create the ACM certificate in?<ul>"
                                + "<li>us-east-1</li>"
                                + "<li>us-west-2</li>"
                                + "<li>ap-southeast-1</li>"
                                + "<li>Both us-east-1 and us-west-2 works</li></ul>", "back": "<b>us-east-1</b> As the Edge-Optimized API Gateway is using a custom AWS managed CloudFront distribution behind the scene to route requests across the globe through CloudFront Edge locations, the ACM certificate must be created in us-east-1." }
  , { "exam": "SAA-C03", "front": "You are managing an AWS Organization with multiple AWS accounts. Each account has a separate application with different resources. You want an easy way to manage Security Groups and WAF Rules across those accounts as there was a security incident the last week and you want to tighten up your resources. Which AWS service can help you to do so?<ul>"
                                + "<li>AWS Guard Duty</li>"
                                + "<li>Amazon Shield</li>"
                                + "<li>Amazon Inspector</li>"
                                + "<li>AWS Firewall Manager</li></ul>", "back": "<b>AWS Firewall Manager</b> " }
  , { "exam": "SAA-C03", "front": "What does this CIDR 10.0.4.0/28 correspond to?<ul>"
                                + "<li>10.0.4.0 to 10.0.4.15</li>"
                                + "<li>10.0.4.0 to 10.0.32.0</li>"
                                + "<li>10.0.4.0 to 10.0.4.28</li>"
                                + "<li>10.0.0.0 to 10.0.16.0</li></ul>", "back": "<b>10.0.4.0 to 10.0.4.15</b> /28 means 16 IPs (=2^(32-28) = 2^4), means only the last digit can change." }
  , { "exam": "SAA-C03", "front": "You have a corporate network of size 10.0.0.0/8 and a satellite office of size 192.168.0.0/16. Which CIDR is acceptable for your AWS VPC if you plan on connecting your networks later on?<ul>"
                                + "<li>172.16.0.0/12</li>"
                                + "<li>172.16.0.0/16</li>"
                                + "<li>10.0.16.0/16</li>"
                                + "<li>192.168.4.0/18</li></ul>", "back": "<b>172.16.0.0/16</b> CIDR not should overlap, and the max CIDR size in AWS is /16." }
  , { "exam": "SAA-C03", "front": "You plan on creating a subnet and want it to have at least capacity for 28 EC2 instances. What's the minimum size you need to have for your subnet?<ul>"
                                + "<li>/28</li>"
                                + "<li>/27</li>"
                                + "<li>/26</li>"
                                + "<li>/25</li></ul>", "back": "<b>/26</b> Perfect size, 64 IPs." }
  , { "exam": "SAA-C03", "front": "Security Groups operate at the ................. level while NACLs operate at the ................. level.<ul>"
                                + "<li>EC2 instance, Subnet</li>"
                                + "<li>Subnet, EC2 instance</li></ul>", "back": "<b>EC2 instance, Subnet</b> " }
  , { "exam": "SAA-C03", "front": "You have attached an Internet Gateway to your VPC, but your EC2 instances still don't have access to the internet. What is NOT a possible issue?<ul>"
                                + "<li>Route Tables are missing entries</li>"
                                + "<li>The EC2 instances don't have public IPs</li>"
                                + "<li>The Security Group does not allow traffic in</li>"
                                + "<li>The NACL does not allow network traffic out</li></ul>", "back": "<b>The Security Group does not allow traffic in</b> Security groups are stateful and if traffic can go out, then it can go back in." }
  , { "exam": "SAA-C03", "front": "You would like to provide Internet access to your EC2 instances in private subnets with IPv4 while making sure this solution requires the least amount of administration and scales seamlessly. What should you use?<ul>"
                                + "<li>NAT Instances with Source/Destination Check flag off</li>"
                                + "<li>Egress Only Internet Gateway</li>"
                                + "<li>NAT Gateway</li></ul>", "back": "<b>NAT Gateway</b> " }
  , { "exam": "SAA-C03", "front": "VPC Peering has been enabled between VPC A and VPC B, and the route tables have been updated for VPC A. But, the EC2 instances cannot communicate. What is the likely issue?<ul>"
                                + "<li>Check the NACL</li>"
                                + "<li>Check the Route Tables in VPC B</li>"
                                + "<li>Check the EC2 instance attached Security Groups</li>"
                                + "<li>Check if DNS Resolution is enabled</li></ul>", "back": "<b>Check the Route Tables in VPC B</b> Route tables must be updated in both VPCs that are peered." }
  , { "exam": "SAA-C03", "front": "You have set up a Direct Connect connection between your corporate data center and your VPC A in your AWS account. You need to access VPC B in another AWS region from your corporate datacenter as well. What should you do?<ul>"
                                + "<li>Enable VPC Peering</li>"
                                + "<li>Use a Customer Gateway</li>"
                                + "<li>Use a Direct Connect Gateway</li>"
                                + "<li>Set up a NAT Gateway</li></ul>", "back": "<b>Use a Direct Connect Gateway</b> This is the main use case of Direct Connect Gateways." }
  , { "exam": "SAA-C03", "front": "When using VPC Endpoints, what are the only two AWS services that have a Gateway Endpoint available?<ul>"
                                + "<li>Amazon S3 & Amazon SQS</li>"
                                + "<li>Amazon SQS & DynamoDB</li>"
                                + "<li>Amazon S3 & DynamoDB</li></ul>", "back": "<b>Amazon S3 & DynamoDB</b> These two services have a VPC Gateway Endpoint (remember it), all the other ones have an Interface endpoint (powered by Private Link - means a private IP)." }
  , { "exam": "SAA-C03", "front": "AWS reserves 5 IP addresses each time you create a new subnet in a VPC. When you create a subnet with CIDR 10.0.0.0/24, the following IP addresses are reserved, EXCEPT ....................<ul>"
                                + "<li>10.0.0.1</li>"
                                + "<li>10.0.0.2</li>"
                                + "<li>10.0.0.3</li>"
                                + "<li>10.0.0.4</li></ul>", "back": "<b>10.0.0.4</b>, because AWS reserves the first four IP addresses (.0, .1, .2, .3) in a subnet for specific purposes, leaving .4 as the first usable address in a subnet created with the CIDR block 10.0.0.0/24." }
  , { "exam": "SAA-C03", "front": "You have 3 VPCs A, B, and C. You want to establish a VPC Peering connection between all the 3 VPCs. What should you do?<ul>"
                                + "<li>As VPC Peering supports Transitive Peering, so you need to establish 2 VPC Peering connections (A-B, B-C)</li>"
                                + "<li>Establish 3 VPC Peering connections (A-B, A-C, B-C)</li></ul>", "back": "<b>Establish 3 VPC Peering connections (A-B, A-C, B-C)</b> " }
  , { "exam": "SAA-C03", "front": "How can you capture information about IP traffic inside your VPCs?<ul>"
                                + "<li>Enable VPC Flow Logs</li>"
                                + "<li>Enable VPC Traffic Mirroring</li>"
                                + "<li>Enable CloudWatch Traffic Logs</li></ul>", "back": "<b>Enable VPC Flow Logs</b> VPC Flow Logs is a VPC feature that enables you to capture information about the IP traffic going to and from network interfaces in your VPC." }
  , { "exam": "SAA-C03", "front": "If you want a 500 Mbps Direct Connect connection between your corporate datacenter to AWS, you would choose a .................. connection.<ul>"
                                + "<li>Dedicated</li>"
                                + "<li>Hosted</li></ul>", "back": "<b>Hosted</b> Hosted Direct Connect connection supports 50Mbps, 500Mbps, up to 10Gbps." }
  , { "exam": "SAA-C03", "front": "When you set up an AWS Site-to-Site VPN connection between your corporate on-premises datacenter and VPCs in AWS Cloud, what are the two major components you want to configure for this connection?<ul>"
                                + "<li>Customer Gateway and NAT Gateway</li>"
                                + "<li>Internet Gateway and Customer Gateway</li>"
                                + "<li>Virtual Private Gateway and Internet Gateway</li>"
                                + "<li>Virtual Private Gateway and Customer Gateway</li></ul>", "back": "<b>Virtual Private Gateway and Customer Gateway</b> " }
  , { "exam": "SAA-C03", "front": "Your company has several on-premises sites across the USA. These sites are currently linked using private connections, but your private connections provider has been recently quite unstable, making your IT architecture partially offline. You would like to create a backup connection that will use the public Internet to link your on-premises sites, that you can failover in case of issues with your provider. What do you recommend?<ul>"
                                + "<li>VPC Peering</li>"
                                + "<li>AWS VPN CloudHub</li>"
                                + "<li>Direct Connect</li>"
                                + "<li>AWS PrivateLink</li></ul>", "back": "<b>AWS VPN CloudHub</b> AWS VPN CloudHub allows you to securely communicate with multiple sites using AWS VPN. It operates on a simple hub-and-spoke model that you can use with or without a VPC." }
  , { "exam": "SAA-C03", "front": "You need to set up a dedicated connection between your on-premises corporate datacenter and AWS Cloud. This connection must be private, consistent, and traffic must not travel through the Internet. Which AWS service should you use?<ul>"
                                + "<li>Site-to-Site VPN</li>"
                                + "<li>AWS PrivateLink</li>"
                                + "<li>AWS Direct Connect</li>"
                                + "<li>Amazon EventBridge</li></ul>", "back": "<b>AWS Direct Connect</b> " }
  , { "exam": "SAA-C03", "front": "Using a Direct Connect connection, you can access both public and private AWS resources.<ul>"
                                + "<li>True</li>"
                                + "<li>False</li></ul>", "back": "<b>True</b> " }
  , { "exam": "SAA-C03", "front": "You want to scale up an AWS Site-to-Site VPN connection throughput, established between your on-premises data and AWS Cloud, beyond a single IPsec tunnel's maximum limit of 1.25 Gbps. What should you do?<ul>"
                                + "<li>Use 2 Virtual Private Gateways</li>"
                                + "<li>Use Direct Connect Gateway</li>"
                                + "<li>Use Transit Gateway</li></ul>", "back": "<b>Use Transit Gateway</b> " }
  , { "exam": "SAA-C03", "front": "You have a VPC in your AWS account that runs in a dual-stack mode. You are continuously trying to launch an EC2 instance, but it fails. After further investigation, you have found that you are no longer have IPv4 addresses available. What should you do?<ul>"
                                + "<li>Modify your VPC to run in IPv6 mode only</li>"
                                + "<li>Modify your VPC to run in IPv4 mode only</li>"
                                + "<li>Add an additional IPv4 CIDR to your VPC</li></ul>", "back": "<b>Add an additional IPv4 CIDR to your VPC</b> " }
  , { "exam": "SAA-C03", "front": "A web application backend is hosted on EC2 instances in private subnets fronted by an Application Load Balancer in public subnets. There is a requirement to give some of the developers access to the backend EC2 instances but without exposing the backend EC2 instances to the Internet. You have created a bastion host EC2 instance in the public subnet and configured the backend EC2 instances Security Group to allow traffic from the bastion host. Which of the following is the best configuration for bastion host Security Group to make it secure?<ul>"
                                + "<li>Allow traffic only on port 80 from the company’s public CIDR</li>"
                                + "<li>Allow traffic only on port 22 from the company’s public CIDR</li>"
                                + "<li>Allow traffic only on port 22 from the company’s private CIDR</li>"
                                + "<li>Allow traffic only on port 80 from the company’s private CIDR</li></ul>", "back": "<b>Allow traffic only on port 22 from the company’s public CIDR</b> " }
  , { "exam": "SAA-C03", "front": "A company has set up a Direct Connect connection between their corporate data center to AWS. There is a requirement to prepare a cost-effective secure backup connection in case there are issues with this Direct Connect connection. What is the most cost effective and secure solution you recommend?<ul>"
                                + "<li>Setup another Direct Connect connection to the same AWS region</li>"
                                + "<li>Setup another Direct Connect connection to a different AWS region</li>"
                                + "<li>Setup a Site-to-Site VPN connection as a backup</li></ul>", "back": "<b>Setup a Site-to-Site VPN connection as a backup</b> " }
  , { "exam": "SAA-C03", "front": "Which AWS service allows you to protect and control traffic in your VPC from layer 3 to layer 7?<ul>"
                                + "<li>AWS Network Firewall</li>"
                                + "<li>Amazon Guard Duty</li>"
                                + "<li>Amazon Inspector</li>"
                                + "<li>Amazon Shield</li></ul>", "back": "<b>AWS Network Firewall</b> " }
  , { "exam": "SAA-C03", "front": "A web application hosted on a fleet of EC2 instances managed by an Auto Scaling Group. You are exposing this application through an Application Load Balancer. Both the EC2 instances and the ALB are deployed on a VPC with the following CIDR 192.168.0.0/18. How do you configure the EC2 instances' security group to ensure only the ALB can access them on port 80?<ul>"
                                + "<li>Add an Inbound Rule with port 80 and 0.0.0.0/0 as the source</li>"
                                + "<li>Add an Inbound Rule with port 80 and 192.168.0.0/18 as the source</li>"
                                + "<li>Add an Inbound Rule with port 80 and ALB's Security Group as the source</li>"
                                + "<li>Load an SSL certificate on the ALB</li></ul>", "back": "<b>Add an Inbound Rule with port 80 and ALB's Security Group as the source</b> This is the most secure way of ensuring only the ALB can access the EC2 instances. Referencing by security groups in rules is an extremely powerful rule and many questions at the exam rely on it. Make sure you fully master the concepts behind it!" }
  , { "exam": "SAA-C03", "front": "As part of your Disaster Recovery plan, you would like to have only the critical infrastructure up and running in AWS. You don't mind a longer Recovery Time Objective (RTO). Which DR strategy do you recommend?<ul>"
                                + "<li>Backup and Restore</li>"
                                + "<li>Pilot Light</li>"
                                + "<li>Warm Standby</li>"
                                + "<li>Multi-Site</li></ul>", "back": "<b>Pilot Light</b> If you're interested, read more about Disaster Recovery options in AWS here: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html" }
  , { "exam": "SAA-C03", "front": "You would like to get the Disaster Recovery strategy with the lowest Recovery Time Objective (RTO) and Recovery Point Objective (RPO), regardless of the cost. Which DR should you choose?<ul>"
                                + "<li>Backup and Restore</li>"
                                + "<li>Pilot Light</li>"
                                + "<li>Warm Standby</li>"
                                + "<li>Multi-Site</li></ul>", "back": "<b>Multi-Site</b> If you're interested, read more about Disaster Recovery options in AWS here: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html" }
  , { "exam": "SAA-C03", "front": "Which of the following Disaster Recovery strategies has a potentially high Recovery Point Objective (RPO) and Recovery Time Objective (RTO)?<ul>"
                                + "<li>Backup and Restore</li>"
                                + "<li>Pilot Light</li>"
                                + "<li>Warm Standby</li>"
                                + "<li>Multi-Site</li></ul>", "back": "<b>Backup and Restore</b> If you're interested, read more about Disaster Recovery options in AWS here: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html" }
  , { "exam": "SAA-C03", "front": "You want to make a Disaster Recovery plan where you have a scaled-down version of your system up and running, and when a disaster happens, it scales up quickly. Which DR strategy should you choose?<ul>"
                                + "<li>Backup and Restore</li>"
                                + "<li>Pilot Light</li>"
                                + "<li>Warm Standby</li>"
                                + "<li>Multi-Site</li></ul>", "back": "<b>Warm Standby</b> If you're interested, read more about Disaster Recovery options in AWS here: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html" }
  , { "exam": "SAA-C03", "front": "You have an on-premises Oracle database that you want to migrate to AWS, specifically to Amazon Aurora. How would you do the migration?<ul>"
                                + "<li>Use AWS Schema Conversion Tool (AWS SCT) to convert the database schema, then use AWS Database Migration Service (AWS DMS) to migrate the data</li>"
                                + "<li>Use AWS Database Migration Service (AWS DMS) to convert the database schema, then use AWS Schema Conversion Tool (AWS SCT) to migrate the data</li></ul>", "back": "<b>Use AWS Schema Conversion Tool (AWS SCT) to convert the database schema, then use AWS Database Migration Service (AWS DMS) to migrate the data</b> " }
  , { "exam": "SAA-C03", "front": "You are running many resources in AWS such as EC2 instances, EBS volumes, DynamoDB tables... You want an easy way to manage backups across all these AWS services from a single place. Which AWS offering makes this process easy?<ul>"
                                + "<li>Amazon S3</li>"
                                + "<li>AWS Storage Gateway</li>"
                                + "<li>AWS Backup</li>"
                                + "<li>EC2 Snapshots</li></ul>", "back": "<b>AWS Backup</b> AWS Backup enables you to centralize and automate data protection across AWS services. It helps you support your regulatory compliance or business policies for data protection." }
  , { "exam": "SAA-C03", "front": "A company planning to migrate its existing websites, applications, servers, virtual machines, and data to AWS. They want to do a lift-and-shift migration with minimum downtime and reduced costs. Which AWS service can help in this scenario?<ul>"
                                + "<li>AWS Database Migration Service</li>"
                                + "<li>AWS Application Migration Service</li>"
                                + "<li>AWS Backup</li>"
                                + "<li>AWS Schema Conversion Tool</li></ul>", "back": "<b>AWS Application Migration Service</b> " }
  , { "exam": "SAA-C03", "front": "A company is using VMware on its on-premises data center to manage its infrastructure. There is a requirement to extend their data center and infrastructure to AWS but keep using the technology stack they are using which is VMware. Which AWS service can they use?<ul>"
                                + "<li>VMware Cloud on AWS</li>"
                                + "<li>AWS DataSync</li>"
                                + "<li>AWS Application Migration Service</li>"
                                + "<li>AWS Application Discovery Service</li></ul>", "back": "<b>VMware Cloud on AWS</b> " }
  , { "exam": "SAA-C03", "front": "A company is using RDS for MySQL as their main database but, lately they have been facing issues in managing the database, performance issues, and the scalability. And they have decided to use Aurora for MySQL instead for better performance, less complexity and less administrative tasks required. What is the best way and most cost-effective way to migrate from RDS for MySQL to Aurora for MySQL?<ul>"
                                + "<li>Raise an AWS support ticket to do the migration as it is not supported</li>"
                                + "<li>Create a database dump from RDS from MySQL, store it in an S3 bucket, then restore it to Aurora for MySQL</li>"
                                + "<li>You can not migrate directly to Aurora for MySQL, you have to create a custom application to insert the data manually</li>"
                                + "<li>Create a snapshot from RDS for MySQL and restore it to Aurora for MySQL</li></ul>", "back": "<b>Create a snapshot from RDS for MySQL and restore it to Aurora for MySQL</b> " }
  , { "exam": "SAA-C03", "front": "Which AWS service can you use to automate the backup across different AWS services such as RDS, DynamoDB, Aurora, and EFS file systems, and EBS volumes?<ul>"
                                + "<li>Amazon S3 Lifecycle Policy</li>"
                                + "<li>AWS DataSync</li>"
                                + "<li>AWS Backup</li>"
                                + "<li>Amazon Glacier</li></ul>", "back": "<b>AWS Backup</b> " }
  , { "exam": "SAA-C03", "front": "You are working on a Serverless application where you want to process objects uploaded to an S3 bucket. You have configured S3 Events on your S3 bucket to invoke a Lambda function every time an object has been uploaded. You want to ensure that events that can't be processed are sent to a Dead Letter Queue (DLQ) for further processing. Which AWS service should you use to set up the DLQ?<ul>"
                                + "<li>S3 Events</li>"
                                + "<li>SNS Topic</li>"
                                + "<li>Lambda Function</li></ul>", "back": "<b>Lambda Function</b> The Lambda function's invocation is 'asynchronous', so the DLQ has to be set on the Lambda function side." }
  , { "exam": "SAA-C03", "front": "As a Solutions Architect, you have created an architecture for a company that includes the following AWS services: CloudFront, Web Application Firewall (AWS WAF), AWS Shield, Application Load Balancer, and EC2 instances managed by an Auto Scaling Group. Sometimes the company receives malicious requests and wants to block these IP addresses. According to your architecture, Where should you do it?<ul>"
                                + "<li>CloudFront</li>"
                                + "<li>AWS WAF</li>"
                                + "<li>AWS Shield</li>"
                                + "<li>ALB Security Group</li>"
                                + "<li>EC2 Security Group</li>"
                                + "<li>NACL</li></ul>", "back": "<b>AWS WAF</b> " }
  , { "exam": "SAA-C03", "front": "You have a set of Linux EC2 instances deployed in a Cluster Placement Group in order to perform High-Performance Computing (HPC). You would like to maximize network performance between your EC2 instances. What should you use?<ul>"
                                + "<li>Elastic Fabric Adapter (EFA)</li>"
                                + "<li>Elastic Network Interface (ENI)</li>"
                                + "<li>Elastic Network Adapter (ENA)</li>"
                                + "<li>FSx for Lustre</li></ul>", "back": "<b>Elastic Fabric Adapter (EFA)</b> " }
  , { "exam": "SAA-C03", "front": "As part of your Disaster Recovery strategy, you would like to make sure your entire infrastructure is code (IaC) so that you can easily re-deploy it in any AWS region. Which AWS service do you recommend?<ul>"
                                + "<li>AWS CodePipeline</li>"
                                + "<li>AWS Elastic Beanstalk</li>"
                                + "<li>AWS CodeDeploy</li>"
                                + "<li>AWS CloudFormation</li></ul>", "back": "<b>AWS CloudFormation</b> AWS CloudFormation is the de-facto service in AWS for infrastructure as code (IaC). It enables you to create and provision AWS infrastructure deployments predictably and repeatedly." }
  , { "exam": "SAA-C03", "front": "Which AWS service allows you to send marketing SMS and push notifications to a large number of customers with personalized messages?<ul>"
                                + "<li>Amazon SNS</li>"
                                + "<li>Amazon PinPoint</li>"
                                + "<li>Amazon SES</li>"
                                + "<li>AWS Lambda</li></ul>", "back": "<b>Amazon PinPoint</b> " }
  , { "exam": "SAA-C03", "front": "What is the most secure way to connect to an EC2 instance without exposing the SSH port 22?<ul>"
                                + "<li>SSM Session Manager</li>"
                                + "<li>Site-to-Site VPN</li>"
                                + "<li>AWS Client VPN</li>"
                                + "<li>Bastion Host</li></ul>", "back": "<b>SSM Session Manager</b> " }
  , { "exam": "SAA-C03", "front": "Which AWS service allows you to run and schedule hundreds of thousands of computing jobs on AWS such as big data and complex analytics jobs?<ul>"
                                + "<li>AWS Simple Batch Service</li>"
                                + "<li>Amazon EC2</li>"
                                + "<li>AWS Batch</li>"
                                + "<li>AWS Lambda</li></ul>", "back": "<b>AWS Batch</b> " }
  , { "exam": "SAA-C03", "front": "The company you are working on is using Salesforce and Slack internally. For archival and some analytics requirements, you have been tasked to transfer the data in both Salesforce and Slack to AWS in an S3 bucket. Which AWS service is best suited for this scenario?<ul>"
                                + "<li>Amazon AppFlow</li>"
                                + "<li>AWS DataSync</li>"
                                + "<li>AWS Data Migration Service</li>"
                                + "<li>AWS Application Migration Service</li></ul>", "back": "<b>Amazon AppFlow</b> " }
  , { "exam": "SAA-C03", "front": "Which AWS Service analyzes your AWS account and gives recommendations for cost optimization, performance, security, fault tolerance, and service limits?<ul>"
                                + "<li>AWS Trusted Advisor</li>"
                                + "<li>AWS CloudTrail</li>"
                                + "<li>AWS Identity and Access Management (AWS IAM)</li>"
                                + "<li>AWS CloudFormation</li></ul>", "back": "<b>AWS Trusted Advisor</b> AWS Trusted Advisor provides recommendations that help you follow AWS best practices. It evaluates your account by using checks. These checks identify ways to optimize your AWS infrastructure, improve security and performance, reduce costs, and monitor service quotas." }
  , { "exam": "SAA-C03", "front": "The product team at a startup has figured out a market need to support both stateful and stateless client-server communications via the application programming interface (APIs) developed using its platform. You have been hired by the startup as a solutions architect to build a solution to fulfill this market need using Amazon API Gateway.Which of the following would you identify as correct?<ul>"
                                + "<li>Amazon API Gateway creates RESTful APIs that enable stateless client-server communication and Amazon API Gateway also creates WebSocket APIs that adhere to the WebSocket protocol, which enables stateless, full-duplex communication between client and server</li>"
                                + "<li>Amazon API Gateway creates RESTful APIs that enable stateful client-server communication and Amazon API Gateway also creates WebSocket APIs that adhere to the WebSocket protocol, which enables stateless, full-duplex communication between client and server</li>"
                                + "<li>Amazon API Gateway creates RESTful APIs that enable stateless client-server communication and Amazon API Gateway also creates WebSocket APIs that adhere to the WebSocket protocol, which enables stateful, full-duplex communication between client and server</li>"
                                + "<li>Amazon API Gateway creates RESTful APIs that enable stateful client-server communication and Amazon API Gateway also creates WebSocket APIs that adhere to the WebSocket protocol, which enables stateful, full-duplex communication between client and server</li></ul>", "back": "<b>Amazon API Gateway creates RESTful APIs that enable stateless client-server communication and Amazon API Gateway also creates WebSocket APIs that adhere to the WebSocket protocol, which enables stateful, full-duplex communication between client and server</b>" }
  , { "exam": "SAA-C03", "front": "A video analytics company runs data-intensive batch processing workloads that generate large log files and metadata daily. These files are currently stored in an on-premises NFS-based storage system located in the company's primary data center. However, the storage system is becoming increasingly difficult to scale and is unable to meet the company's growing storage demands. The IT team wants to migrate to a cloud-based storage solution that minimizes costs, retains NFS compatibility, and supports automated tiering of rarely accessed data to lower-cost storage. The team prefers to continue using existing NFS-based tools and protocols for compatibility with their current application stack.Which solution will meet these requirements MOST cost-effectively?<ul>"
                                + "<li>Provision an Amazon Elastic File System (Amazon EFS) file system with the One Zone–IA storage class. Use AWS DataSync to migrate the NFS data to EFS. Configure the application to mount the file system over NFS and activate lifecycle management to tier infrequently accessed files</li>"
                                + "<li>Deploy an AWS Storage Gateway Volume Gateway in cached mode. Attach it as a block device to an on-premises file server and mount NFS on top. Store snapshots in Amazon S3 Glacier Deep Archive, and use AWS Backup to manage recovery operations and tiering</li>"
                                + "<li>Deploy an AWS Storage Gateway File Gateway on premises. Configure it to present an NFS-compatible file share to the workloads. Store the uploaded files in Amazon S3, and use S3 Lifecycle policies to automatically transition infrequently accessed objects to lower-cost storage classes</li>"
                                + "<li>Use Amazon FSx for Windows File Server to replace the NFS workload. Enable data deduplication and automatic backups. Use Amazon S3 Glacier to move snapshots to a cost-efficient storage tier. Reconfigure the analytics application to access files using SMB protocol</li></ul>", "back": "<b>Deploy an AWS Storage Gateway File Gateway on premises. Configure it to present an NFS-compatible file share to the workloads. Store the uploaded files in Amazon S3, and use S3 Lifecycle policies to automatically transition infrequently accessed objects to lower-cost storage classes</b>" }
  , { "exam": "SAA-C03", "front": "A digital event-ticketing platform hosts its core transaction-processing service on AWS. The service runs on Amazon EC2 instances and stores finalized transactions in an Amazon Aurora PostgreSQL database. During periods of high user activity - such as flash ticket sales or holiday promotions - the application begins timing out, causing failed or delayed purchases. A solutions architect has been asked to redesign the backend for scalability and cost-efficiency, without reengineering the database layer.Which combination of actions will meet these goals in the most cost-effective and scalable manner? (Select two)<ul>"
                                + "<li>Deploy an Amazon API Gateway with throttling and usage plans to slow down incoming purchase requests during peak times and maintain application stability</li>"
                                + "<li>Modify the application to publish purchase events to an Amazon SQS queue. Launch an Auto Scaling group of EC2 workers that poll the queue and process purchases asynchronously</li>"
                                + "<li>Deploy read replicas for the Aurora database in another Region and configure EC2 instances to read and write from the nearest replica based on latency</li>"
                                + "<li>Implement Amazon RDS Proxy between the application and the Aurora PostgreSQL cluster. Deploy EC2 instances in an Auto Scaling group to retry transactions as needed</li>"
                                + "<li>Use an Amazon ElastiCache cluster to cache database queries. Configure the application to store purchase transactions in the cache before writing to the database</li></ul>", "back": "<b>Modify the application to publish purchase events to an Amazon SQS queue. Launch an Auto Scaling group of EC2 workers that poll the queue and process purchases asynchronously, Implement Amazon RDS Proxy between the application and the Aurora PostgreSQL cluster. Deploy EC2 instances in an Auto Scaling group to retry transactions as needed</b>" }
  , { "exam": "SAA-C03", "front": "A healthcare analytics company centralizes clinical and operational datasets in an Amazon S3–based data lake. Incoming data is ingested in Apache Parquet format from multiple hospitals and wearable health devices. To ensure quality and standardization, the company applies several transformation steps: anomaly filtering, datetime normalization, and aggregation by patient cohort. The company needs a solution to support a code-free interface that enables data engineers and business analysts to collaborate on data preparation workflows. The company also requires data lineage tracking, data profiling capabilities, and an easy way to share transformation logic across teams without writing or managing code.Which AWS solution best meets these requirements?<ul>"
                                + "<li>Use Amazon AppFlow to move and transform Parquet files in S3. Configure AppFlow transformations and mappings within the visual interface. Share flows with collaborators through AWS IAM policies and scheduled executions</li>"
                                + "<li>Create Amazon Athena SQL queries to perform transformation steps directly on S3. Store queries in AWS Glue Data Catalog and share saved queries with other users through Amazon Athena's query editor</li>"
                                + "<li>Use AWS Glue DataBrew to visually build transformation workflows on top of the raw Parquet files in S3. Use DataBrew recipes to track, audit, and share the transformation steps with others. Enable data profiling to inspect column statistics, null values, and data types across datasets</li>"
                                + "<li>Use AWS Glue Studio’s visual canvas to design data transformation workflows on top of the Parquet files in Amazon S3. Configure Glue Studio jobs to run these transformations without writing code. Share the job definitions with team members for reuse. Use the visual job editor to track transformation progress and inspect profiling statistics for each dataset column</li></ul>", "back": "<b>Use AWS Glue DataBrew to visually build transformation workflows on top of the raw Parquet files in S3. Use DataBrew recipes to track, audit, and share the transformation steps with others. Enable data profiling to inspect column statistics, null values, and data types across datasets</b>" }
  , { "exam": "SAA-C03", "front": "The DevOps team at an e-commerce company wants to perform some maintenance work on a specific Amazon EC2 instance that is part of an Auto Scaling group using a step scaling policy. The team is facing a maintenance challenge - every time the team deploys a maintenance patch, the instance health check status shows as out of service for a few minutes. This causes the Auto Scaling group to provision another replacement instance immediately.As a solutions architect, which are the MOST time/resource efficient steps that you would recommend so that the maintenance work can be completed at the earliest? (Select two)<ul>"
                                + "<li>Put the instance into the Standby state and then update the instance by applying the maintenance patch. Once the instance is ready, you can exit the Standby state and then return the instance to service</li>"
                                + "<li>Take a snapshot of the instance, create a new Amazon Machine Image (AMI) and then launch a new instance using this AMI. Apply the maintenance patch to this new instance and then add it back to the Auto Scaling Group by using the manual scaling policy. Terminate the earlier instance that had the maintenance issue</li>"
                                + "<li>Delete the Auto Scaling group and apply the maintenance fix to the given instance. Create a new Auto Scaling group and add all the instances again using the manual scaling policy</li>"
                                + "<li>Suspend the ReplaceUnhealthy process type for the Auto Scaling group and apply the maintenance patch to the instance. Once the instance is ready, you can manually set the instance's health status back to healthy and activate the ReplaceUnhealthy process type again</li>"
                                + "<li>Suspend the ScheduledActions process type for the Auto Scaling group and apply the maintenance patch to the instance. Once the instance is ready, you can you can manually set the instance's health status back to healthy and activate the ScheduledActions process type again</li></ul>", "back": "<b>Put the instance into the Standby state and then update the instance by applying the maintenance patch. Once the instance is ready, you can exit the Standby state and then return the instance to service, Suspend the ReplaceUnhealthy process type for the Auto Scaling group and apply the maintenance patch to the instance. Once the instance is ready, you can manually set the instance's health status back to healthy and activate the ReplaceUnhealthy process type again</b>" }
  , { "exam": "SAA-C03", "front": "A company runs a data processing workflow that takes about 60 minutes to complete. The workflow can withstand disruptions and it can be started and stopped multiple times.Which is the most cost-effective solution to build a solution for the workflow?<ul>"
                                + "<li>Use Amazon EC2 spot instances to run the workflow processes</li>"
                                + "<li>Use AWS Lambda function to run the workflow processes</li>"
                                + "<li>Use Amazon EC2 reserved instances to run the workflow processes</li>"
                                + "<li>Use Amazon EC2 on-demand instances to run the workflow processes</li></ul>", "back": "<b>Use Amazon EC2 spot instances to run the workflow processes</b>" }
  , { "exam": "SAA-C03", "front": "A large financial institution operates an on-premises data center with hundreds of petabytes of data managed on Microsoft’s Distributed File System (DFS). The CTO wants the organization to transition into a hybrid cloud environment and run data-intensive analytics workloads that support DFS.Which of the following AWS services can facilitate the migration of these workloads?<ul>"
                                + "<li>Amazon FSx for Windows File Server</li>"
                                + "<li>Amazon FSx for Lustre</li>"
                                + "<li>Microsoft SQL Server on AWS</li>"
                                + "<li>AWS Directory Service for Microsoft Active Directory (AWS Managed Microsoft AD)</li></ul>", "back": "<b>Amazon FSx for Windows File Server</b>" }
  , { "exam": "SAA-C03", "front": "A retail company's dynamic website is hosted using on-premises servers in its data center in the United States. The company is launching its website in Asia, and it wants to optimize the website loading times for new users in Asia. The website's backend must remain in the United States. The website is being launched in a few days, and an immediate solution is needed.What would you recommend?<ul>"
                                + "<li>Use Amazon CloudFront with a custom origin pointing to the on-premises servers</li>"
                                + "<li>Use Amazon CloudFront with a custom origin pointing to the DNS record of the website on Amazon Route 53</li>"
                                + "<li>Leverage a Amazon Route 53 geo-proximity routing policy pointing to on-premises servers</li>"
                                + "<li>Migrate the website to Amazon S3. Use S3 cross-region replication (S3 CRR) between AWS Regions in the US and Asia</li></ul>", "back": "<b>Use Amazon CloudFront with a custom origin pointing to the on-premises servers</b>" }
  , { "exam": "SAA-C03", "front": "An IT company wants to review its security best-practices after an incident was reported where a new developer on the team was assigned full access to Amazon DynamoDB. The developer accidentally deleted a couple of tables from the production environment while building out a new feature.Which is the MOST effective way to address this issue so that such incidents do not recur?<ul>"
                                + "<li>Use permissions boundary to control the maximum permissions employees can grant to the IAM principals</li>"
                                + "<li>Only root user should have full database access in the organization</li>"
                                + "<li>Remove full database access for all IAM users in the organization</li>"
                                + "<li>The CTO should review the permissions for each new developer's IAM user so that such incidents don't recur</li></ul>", "back": "<b>Use permissions boundary to control the maximum permissions employees can grant to the IAM principals</b>" }
  , { "exam": "SAA-C03", "front": "A healthcare startup needs to enforce compliance and regulatory guidelines for objects stored in Amazon S3. One of the key requirements is to provide adequate protection against accidental deletion of objects.As a solutions architect, what are your recommendations to address these guidelines? (Select two) ?<ul>"
                                + "<li>Enable multi-factor authentication (MFA) delete on the Amazon S3 bucket</li>"
                                + "<li>Create an event trigger on deleting any Amazon S3 object. The event invokes an Amazon Simple Notification Service (Amazon SNS) notification via email to the IT manager</li>"
                                + "<li>Change the configuration on Amazon S3 console so that the user needs to provide additional confirmation while deleting any Amazon S3 object</li>"
                                + "<li>Establish a process to get managerial approval for deleting Amazon S3 objects</li>"
                                + "<li>Enable versioning on the Amazon S3 bucket</li></ul>", "back": "<b>Enable multi-factor authentication (MFA) delete on the Amazon S3 bucket, Enable versioning on the Amazon S3 bucket</b>" }
  , { "exam": "SAA-C03", "front": "A media company runs a photo-sharing web application that is accessed across three different countries. The application is deployed on several Amazon Elastic Compute Cloud (Amazon EC2) instances running behind an Application Load Balancer. With new government regulations, the company has been asked to block access from two countries and allow access only from the home country of the company.Which configuration should be used to meet this changed requirement?<ul>"
                                + "<li>Use Geo Restriction feature of Amazon CloudFront in a Amazon Virtual Private Cloud (Amazon VPC)</li>"
                                + "<li>Configure the security group for the Amazon EC2 instances</li>"
                                + "<li>Configure AWS Web Application Firewall (AWS WAF) on the Application Load Balancer in a Amazon Virtual Private Cloud (Amazon VPC)</li>"
                                + "<li>Configure the security group on the Application Load Balancer</li></ul>", "back": "<b>Configure AWS Web Application Firewall (AWS WAF) on the Application Load Balancer in a Amazon Virtual Private Cloud (Amazon VPC)</b>" }
  , { "exam": "SAA-C03", "front": "A digital wallet company plans to launch a new cloud-based service for processing user cash transfers and peer-to-peer payments. The application will receive transaction requests from mobile clients via a secure endpoint. Each transaction request must go through a lightweight validation step before being forwarded for backend processing, which includes fraud detection, ledger updates, and notifications. The backend workload is compute- and memory-intensive, requires scaling based on volume, and must run for a longer duration than typical short-lived tasks. The engineering team prefers a fully managed solution that minimizes infrastructure maintenance, including provisioning and patching of virtual machines or containers.Which solution will meet these requirements with the LEAST operational overhead?<ul>"
                                + "<li>Expose an Amazon API Gateway REST API endpoint to receive transaction requests from mobile clients. Integrate the API with AWS Lambda to perform basic validation. For backend processing, deploy the long-running application to Amazon ECS using the Fargate launch type, allowing ECS to manage compute and memory provisioning automatically, with no server management required</li>"
                                + "<li>Create an Amazon API Gateway endpoint to receive transaction requests from mobile devices. Use AWS Lambda to validate the transactions. For backend processing, deploy the application on Amazon EKS Anywhere, running on on-premises servers in the company’s data center. Use a custom provisioning script to scale Kubernetes worker nodes based on transaction volume</li>"
                                + "<li>Configure Amazon SQS to receive encrypted payment notifications from mobile devices. Use Amazon EventBridge rules to extract the payload and perform validation. Route the messages to a backend system hosted on Amazon Lightsail instances with dynamic scaling policies based on memory thresholds and instance health checks</li>"
                                + "<li>Build a REST API using Amazon API Gateway. Integrate it with an AWS Step Functions state machine for validation. Launch the backend application using Amazon EKS with self-managed nodes, and use Kubernetes Jobs to handle transaction processing workflows. Manually scale the cluster based on demand</li></ul>", "back": "<b>Expose an Amazon API Gateway REST API endpoint to receive transaction requests from mobile clients. Integrate the API with AWS Lambda to perform basic validation. For backend processing, deploy the long-running application to Amazon ECS using the Fargate launch type, allowing ECS to manage compute and memory provisioning automatically, with no server management required</b>" }
  , { "exam": "SAA-C03", "front": "A new DevOps engineer has just joined a development team and wants to understand the replication capabilities for Amazon RDS Multi-AZ deployment as well as Amazon RDS Read-replicas.Which of the following correctly summarizes these capabilities for the given database?<ul>"
                                + "<li>Multi-AZ follows asynchronous replication and spans at least two Availability Zones (AZs) within a single region. Read replicas follow synchronous replication and can be within an Availability Zone (AZ), Cross-AZ, or Cross-Region</li>"
                                + "<li>Multi-AZ follows asynchronous replication and spans at least two Availability Zones (AZs) within a single region. Read replicas follow asynchronous replication and can be within an Availability Zone (AZ), Cross-AZ, or Cross-Region</li>"
                                + "<li>Multi-AZ follows synchronous replication and spans at least two Availability Zones (AZs) within a single region. Read replicas follow asynchronous replication and can be within an Availability Zone (AZ), Cross-AZ, or Cross-Region</li>"
                                + "<li>Multi-AZ follows asynchronous replication and spans one Availability Zone (AZ) within a single region. Read replicas follow synchronous replication and can be within an Availability Zone (AZ), Cross-AZ, or Cross-Region</li></ul>", "back": "<b>Multi-AZ follows synchronous replication and spans at least two Availability Zones (AZs) within a single region. Read replicas follow asynchronous replication and can be within an Availability Zone (AZ), Cross-AZ, or Cross-Region</b>" }
  , { "exam": "SAA-C03", "front": "A US-based healthcare startup is building an interactive diagnostic tool for COVID-19 related assessments. The users would be required to capture their personal health records via this tool. As this is sensitive health information, the backup of the user data must be kept encrypted in Amazon Simple Storage Service (Amazon S3). The startup does not want to provide its own encryption keys but still wants to maintain an audit trail of when an encryption key was used and by whom.Which of the following is the BEST solution for this use-case?<ul>"
                                + "<li>Use server-side encryption with Amazon S3 managed keys (SSE-S3) to encrypt the user data on Amazon S3</li>"
                                + "<li>Use client-side encryption with client provided keys and then upload the encrypted user data to Amazon S3</li>"
                                + "<li>Use server-side encryption with AWS Key Management Service keys (SSE-KMS) to encrypt the user data on Amazon S3</li>"
                                + "<li>Use server-side encryption with customer-provided keys (SSE-C) to encrypt the user data on Amazon S3</li></ul>", "back": "<b>Use server-side encryption with AWS Key Management Service keys (SSE-KMS) to encrypt the user data on Amazon S3</b>" }
  , { "exam": "SAA-C03", "front": "An IT consultant is helping the owner of a medium-sized business set up an AWS account. What are the security recommendations he must follow while creating the AWS account root user? (Select two)<ul>"
                                + "<li>Send an email to the business owner with details of the login username and password for the AWS root user. This will help the business owner to troubleshoot any login issues in future</li>"
                                + "<li>Create AWS account root user access keys and share those keys only with the business owner</li>"
                                + "<li>Encrypt the access keys and save them on Amazon S3</li>"
                                + "<li>Create a strong password for the AWS account root user</li>"
                                + "<li>Enable Multi Factor Authentication (MFA) for the AWS account root user account</li></ul>", "back": "<b>Create a strong password for the AWS account root user, Enable Multi Factor Authentication (MFA) for the AWS account root user account</b>" }
  , { "exam": "SAA-C03", "front": "The IT department at a consulting firm is conducting a training workshop for new developers. As part of an evaluation exercise on Amazon S3, the new developers were asked to identify the invalid storage class lifecycle transitions for objects stored on Amazon S3.Can you spot the INVALID lifecycle transitions from the options below? (Select two)<ul>"
                                + "<li>Amazon S3 Standard-IA => Amazon S3 One Zone-IA</li>"
                                + "<li>Amazon S3 Standard-IA => Amazon S3 Intelligent-Tiering</li>"
                                + "<li>Amazon S3 Intelligent-Tiering => Amazon S3 Standard</li>"
                                + "<li>Amazon S3 Standard => Amazon S3 Intelligent-Tiering</li>"
                                + "<li>Amazon S3 One Zone-IA => Amazon S3 Standard-IA</li></ul>", "back": "<b>Amazon S3 Intelligent-Tiering => Amazon S3 Standard, Amazon S3 One Zone-IA => Amazon S3 Standard-IA</b>" }
  , { "exam": "SAA-C03", "front": "An enterprise runs a microservices-based application on Amazon EKS, deployed on EC2 worker nodes. The application includes a frontend UI service that interacts with Amazon DynamoDB and a data-processing service that stores and retrieves files from Amazon S3. The organization needs to strictly enforce least privilege access: the UI Pods must access only DynamoDB, and the data-processing Pods must access only S3.Which solution will best enforce these access controls within the EKS cluster?<ul>"
                                + "<li>Create separate Kubernetes service accounts for the UI and data services. Use IAM Roles for Service Accounts (IRSA) to map each service account to an IAM role with only the required permissions. Assign DynamoDB access to the UI Pods and S3 access to the data Pods</li>"
                                + "<li>Create IAM policies for DynamoDB and S3 access, and attach both to the EC2 instance profile used by the EKS nodes. Use Kubernetes role-based access control (RBAC) to control service-level permissions within the cluster</li>"
                                + "<li>Create one Kubernetes service account shared across all Pods. Attach a single IAM role to this account with both AmazonS3FullAccess and AmazonDynamoDBFullAccess policies</li>"
                                + "<li>Attach an IAM policy directly to each Pod using Kubernetes annotations. Assign the S3 policy to data-service Pods and the DynamoDB policy to UI Pods</li></ul>", "back": "<b>Create separate Kubernetes service accounts for the UI and data services. Use IAM Roles for Service Accounts (IRSA) to map each service account to an IAM role with only the required permissions. Assign DynamoDB access to the UI Pods and S3 access to the data Pods</b>" }
  , { "exam": "SAA-C03", "front": "A government agency is developing a online application to assist users in submitting permit requests through a web-based interface. The system architecture consists of a front-end web application tier and a background processing tier that handles the validation and submission of the forms. The application is expected to see high traffic and it must ensure that every submitted request is processed exactly once, with no loss of data.Which design choice best satisfies these requirements?<ul>"
                                + "<li>Leverage Amazon EventBridge to send events from the web application to the processing tier for asynchronous form handling</li>"
                                + "<li>Leverage Amazon API Gateway to pass the form submissions to AWS Lambda for processing in real time</li>"
                                + "<li>Implement an Amazon SQS FIFO queue to reliably buffer and deliver form submissions from the web application layer to the processing tier</li>"
                                + "<li>Implement an Amazon SQS standard queue to reliably buffer and deliver form submissions from the web application layer to the processing tier</li></ul>", "back": "<b>Implement an Amazon SQS FIFO queue to reliably buffer and deliver form submissions from the web application layer to the processing tier</b>" }
  , { "exam": "SAA-C03", "front": "A software company has a globally distributed team of developers, that requires secure and compliant access to AWS environments. The company manages multiple AWS accounts under AWS Organizations and uses an on-premises Microsoft Active Directory for user authentication. To simplify access control and identity governance across projects and accounts, the company wants a centrally managed solution that integrates with their existing infrastructure. The solution should require the least amount of ongoing operational management.Which approach best meets the company’s requirements?<ul>"
                                + "<li>Use AWS Control Tower to enable account access for developers. Create AWS IAM roles in each member account and manually assign permissions. Instruct developers to assume roles across accounts using the AWS CLI</li>"
                                + "<li>Deploy AWS Directory Service for Microsoft Active Directory in AWS. Establish a trust relationship with the on-premises Active Directory. Use IAM roles linked to AD groups to control access to AWS resources</li>"
                                + "<li>Use AWS Directory Service AD Connector to connect AWS to the on-premises Active Directory. Integrate AD Connector with AWS IAM Identity Center. Use permission sets to assign access to AWS accounts and resources based on Active Directory group membership</li>"
                                + "<li>Deploy an open-source identity provider (IdP) on Amazon EC2. Synchronize it with the on-premises Active Directory and use SAML to federate access to AWS accounts. Assign IAM roles to federated users based on SAML assertions</li></ul>", "back": "<b>Use AWS Directory Service AD Connector to connect AWS to the on-premises Active Directory. Integrate AD Connector with AWS IAM Identity Center. Use permission sets to assign access to AWS accounts and resources based on Active Directory group membership</b>" }
  , { "exam": "SAA-C03", "front": "The payroll department at a company initiates several computationally intensive workloads on Amazon EC2 instances at a designated hour on the last day of every month. The payroll department has noticed a trend of severe performance lag during this hour. The engineering team has figured out a solution by using Auto Scaling Group for these Amazon EC2 instances and making sure that 10 Amazon EC2 instances are available during this peak usage hour. For normal operations only 2 Amazon EC2 instances are enough to cater to the workload.As a solutions architect, which of the following steps would you recommend to implement the solution?<ul>"
                                + "<li>Configure your Auto Scaling group by creating a scheduled action that kicks-off at the designated hour on the last day of the month. Set the desired capacity of instances to 10. This causes the scale-out to happen before peak traffic kicks in at the designated hour</li>"
                                + "<li>Configure your Auto Scaling group by creating a target tracking policy and setting the instance count to 10 at the designated hour. This causes the scale-out to happen before peak traffic kicks in at the designated hour</li>"
                                + "<li>Configure your Auto Scaling group by creating a simple tracking policy and setting the instance count to 10 at the designated hour. This causes the scale-out to happen before peak traffic kicks in at the designated hour</li>"
                                + "<li>Configure your Auto Scaling group by creating a scheduled action that kicks-off at the designated hour on the last day of the month. Set the min count as well as the max count of instances to 10. This causes the scale-out to happen before peak traffic kicks in at the designated hour</li></ul>", "back": "<b>Configure your Auto Scaling group by creating a scheduled action that kicks-off at the designated hour on the last day of the month. Set the desired capacity of instances to 10. This causes the scale-out to happen before peak traffic kicks in at the designated hour</b>" }
  , { "exam": "SAA-C03", "front": "The engineering team at an e-commerce company wants to establish a dedicated, encrypted, low latency, and high throughput connection between its data center and AWS Cloud. The engineering team has set aside sufficient time to account for the operational overhead of establishing this connection.As a solutions architect, which of the following solutions would you recommend to the company?<ul>"
                                + "<li>Use AWS Direct Connect to establish a connection between the data center and AWS Cloud</li>"
                                + "<li>Use AWS Transit Gateway to establish a connection between the data center and AWS Cloud</li>"
                                + "<li>Use AWS site-to-site VPN to establish a connection between the data center and AWS Cloud</li>"
                                + "<li>Use AWS Direct Connect plus virtual private network (VPN) to establish a connection between the data center and AWS Cloud</li></ul>", "back": "<b>Use AWS Direct Connect plus virtual private network (VPN) to establish a connection between the data center and AWS Cloud</b>" }
  , { "exam": "SAA-C03", "front": "A leading social media analytics company is contemplating moving its dockerized application stack into AWS Cloud. The company is not sure about the pricing for using Amazon Elastic Container Service (Amazon ECS) with the EC2 launch type compared to the Amazon Elastic Container Service (Amazon ECS) with the Fargate launch type.Which of the following is correct regarding the pricing for these two services?<ul>"
                                + "<li>Both Amazon ECS with EC2 launch type and Amazon ECS with Fargate launch type are just charged based on Elastic Container Service used per hour</li>"
                                + "<li>Amazon ECS with EC2 launch type is charged based on EC2 instances and EBS volumes used. Amazon ECS with Fargate launch type is charged based on vCPU and memory resources that the containerized application requests</li>"
                                + "<li>Both Amazon ECS with EC2 launch type and Amazon ECS with Fargate launch type are charged based on Amazon EC2 instances and Amazon EBS Elastic Volumes used</li>"
                                + "<li>Both Amazon ECS with EC2 launch type and Amazon ECS with Fargate launch type are charged based on vCPU and memory resources that the containerized application requests</li></ul>", "back": "<b>Amazon ECS with EC2 launch type is charged based on EC2 instances and EBS volumes used. Amazon ECS with Fargate launch type is charged based on vCPU and memory resources that the containerized application requests</b>" }
  , { "exam": "SAA-C03", "front": "The engineering team at a Spanish professional football club has built a notification system for its website using Amazon Simple Notification Service (Amazon SNS) notifications which are then handled by an AWS Lambda function for end-user delivery. During the off-season, the notification systems need to handle about 100 requests per second. During the peak football season, the rate touches about 5000 requests per second and it is noticed that a significant number of the notifications are not being delivered to the end-users on the website.As a solutions architect, which of the following would you suggest as the BEST possible solution to this issue?<ul>"
                                + "<li>Amazon SNS has hit a scalability limit, so the team needs to contact AWS support to raise the account limit</li>"
                                + "<li>The engineering team needs to provision more servers running the Amazon SNS service</li>"
                                + "<li>Amazon SNS message deliveries to AWS Lambda have crossed the account concurrency quota for AWS Lambda, so the team needs to contact AWS support to raise the account limit</li>"
                                + "<li>The engineering team needs to provision more servers running the AWS Lambda service</li></ul>", "back": "<b>Amazon SNS message deliveries to AWS Lambda have crossed the account concurrency quota for AWS Lambda, so the team needs to contact AWS support to raise the account limit</b>" }
  , { "exam": "SAA-C03", "front": "A media agency stores its re-creatable assets on Amazon Simple Storage Service (Amazon S3) buckets. The assets are accessed by a large number of users for the first few days and the frequency of access falls down drastically after a week. Although the assets would be accessed occasionally after the first week, but they must continue to be immediately accessible when required. The cost of maintaining all the assets on Amazon S3 storage is turning out to be very expensive and the agency is looking at reducing costs as much as possible.As an AWS Certified Solutions Architect – Associate, can you suggest a way to lower the storage costs while fulfilling the business requirements?<ul>"
                                + "<li>Configure a lifecycle policy to transition the objects to Amazon S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days</li>"
                                + "<li>Configure a lifecycle policy to transition the objects to Amazon S3 Standard-Infrequent Access (S3 Standard-IA) after 7 days</li>"
                                + "<li>Configure a lifecycle policy to transition the objects to Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) after 7 days</li>"
                                + "<li>Configure a lifecycle policy to transition the objects to Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) after 30 days</li></ul>", "back": "<b>Configure a lifecycle policy to transition the objects to Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) after 30 days</b>" }
  , { "exam": "SAA-C03", "front": "A healthcare company is developing a secure internal web portal hosted on AWS. The application must communicate with legacy systems that reside in the company's on-premises data centers. These data centers are connected to AWS via a site-to-site VPN. The company uses Amazon Route 53 as its DNS solution and requires the application to resolve private DNS records for the on-premises services from within its Amazon VPC.What is the MOST secure and appropriate way to meet these DNS resolution requirements?<ul>"
                                + "<li>Create a hybrid connectivity gateway and attach the on-premises DNS servers to Route 53 as authoritative zones for internal domains</li>"
                                + "<li>Create a Route 53 private hosted zone for the on-premises domain. Associate the hosted zone with the VPC to allow the application to resolve DNS names of the on-premises services</li>"
                                + "<li>Create a Route 53 Resolver outbound endpoint. Define a forwarding rule that routes DNS queries for on-premises domains to the on-premises DNS server. Associate the rule with the VPC</li>"
                                + "<li>Configure a Route 53 Resolver inbound endpoint and create a DNS forwarding rule. Enable recursive DNS resolution in the VPC to access on-premises services</li></ul>", "back": "<b>Create a Route 53 Resolver outbound endpoint. Define a forwarding rule that routes DNS queries for on-premises domains to the on-premises DNS server. Associate the rule with the VPC</b>" }
  , { "exam": "SAA-C03", "front": "A biotech research company needs to perform data analytics on real-time lab results provided by a partner organization. The partner stores these lab results in an Amazon RDS for MySQL instance within the partner’s own AWS account. The research company has a private VPC that does not have internet access, Direct Connect, or a VPN connection. However, the company must establish secure and private connectivity to the RDS database in the partner’s VPC. The solution must allow the research company to connect from its VPC while minimizing complexity and complying with data security requirements.Which solution will meet these requirements?<ul>"
                                + "<li>Configure a client VPN endpoint in the company’s account. Have researchers connect to the VPN from their local machines. Establish a Direct Connect gateway to the partner’s VPC and route RDS traffic via this connection</li>"
                                + "<li>Instruct the partner to create a Network Load Balancer (NLB) in front of the Amazon RDS for MySQL instance. Use AWS PrivateLink to expose the NLB as an interface VPC endpoint in the research company’s VPC</li>"
                                + "<li>Set up VPC peering between the company’s VPC and the partner’s VPC. Use AWS Transit Gateway in the partner's account to route traffic from the company’s VPC to the database. Modify the RDS subnet route tables to allow access from the company’s CIDR block</li>"
                                + "<li>Instruct the partner to enable public access on the Amazon RDS instance and add a security group rule to allow inbound access from the company’s IP range. The company accesses the database over the public internet through a NAT Gateway configured in a private subnet</li></ul>", "back": "<b>Instruct the partner to create a Network Load Balancer (NLB) in front of the Amazon RDS for MySQL instance. Use AWS PrivateLink to expose the NLB as an interface VPC endpoint in the research company’s VPC</b>" }
  , { "exam": "SAA-C03", "front": "A junior scientist working with the Deep Space Research Laboratory at NASA is trying to upload a high-resolution image of a nebula into Amazon S3. The image size is approximately 3 gigabytes. The junior scientist is using Amazon S3 Transfer Acceleration (Amazon S3TA) for faster image upload. It turns out that Amazon S3TA did not result in an accelerated transfer.Given this scenario, which of the following is correct regarding the charges for this image transfer?<ul>"
                                + "<li>The junior scientist needs to pay both S3 transfer charges and S3TA transfer charges for the image upload</li>"
                                + "<li>The junior scientist does not need to pay any transfer charges for the image upload</li>"
                                + "<li>The junior scientist only needs to pay S3TA transfer charges for the image upload</li>"
                                + "<li>The junior scientist only needs to pay Amazon S3 transfer charges for the image upload</li></ul>", "back": "<b>The junior scientist does not need to pay any transfer charges for the image upload</b>" }
  , { "exam": "SAA-C03", "front": "An e-commerce company manages a digital catalog of consumer products submitted by third-party sellers. Each product submission includes a description stored as a text file in an Amazon S3 bucket. These descriptions may include ingredient information for consumable products like snacks, supplements, or beverages. The company wants to build a fully automated solution that extracts ingredient names from the uploaded product descriptions and uses those names to query an Amazon DynamoDB table, which returns precomputed health and safety scores for each ingredient. Non-food items and invalid submissions can be ignored without affecting application logic. The company has no in-house machine learning (ML) experts and is looking for the most cost-effective solution with minimal operational overhead.Which solution meets these requirements MOST cost-effectively?<ul>"
                                + "<li>Configure S3 Event Notifications to trigger an AWS Lambda function whenever a new product description is uploaded. Inside the function, use Amazon Comprehend's custom entity recognition feature to extract ingredient names. Store these names in the DynamoDB table and let the front-end application query for health scores</li>"
                                + "<li>Create a workflow where Amazon Transcribe is used to convert synthetic audio versions (created from text of the product descriptions) back into text. Analyze the transcripts manually or using simple keyword matching within a Lambda function. Use Amazon SNS to notify the content moderation team for each processed file</li>"
                                + "<li>Use Amazon SageMaker with a custom-trained NLP model to identify ingredients from the uploaded descriptions. Use Amazon EventBridge to invoke a Lambda function that forwards the document content to a SageMaker endpoint and stores the results in DynamoDB. Fine-tune the model using labeled ingredient datasets from open-source repositories and retrain it monthly</li>"
                                + "<li>Use Amazon Lookout for Vision to scan the uploaded text files in the S3 bucket and extract entities. Invoke this workflow using an S3-triggered Lambda function. Parse the output and use Amazon API Gateway to push updates to the frontend in real time</li></ul>", "back": "<b>Configure S3 Event Notifications to trigger an AWS Lambda function whenever a new product description is uploaded. Inside the function, use Amazon Comprehend's custom entity recognition feature to extract ingredient names. Store these names in the DynamoDB table and let the front-end application query for health scores</b>" }
  , { "exam": "SAA-C03", "front": "A software engineering intern at an e-commerce company is documenting the process flow to provision Amazon EC2 instances via the Amazon EC2 API. These instances are to be used for an internal application that processes Human Resources payroll data. He wants to highlight those volume types that cannot be used as a boot volume.Can you help the intern by identifying those storage volume types that CANNOT be used as boot volumes while creating the instances? (Select two)<ul>"
                                + "<li>Instance Store</li>"
                                + "<li>General Purpose Solid State Drive (gp2)</li>"
                                + "<li>Cold Hard disk drive (sc1)</li>"
                                + "<li>Provisioned IOPS Solid state drive (io1)</li>"
                                + "<li>Throughput Optimized Hard disk drive (st1)</li></ul>", "back": "<b>Cold Hard disk drive (sc1), Throughput Optimized Hard disk drive (st1)</b>" }
  , { "exam": "SAA-C03", "front": "An ivy-league university is assisting NASA to find potential landing sites for exploration vehicles of unmanned missions to our neighboring planets. The university uses High Performance Computing (HPC) driven application architecture to identify these landing sites.Which of the following Amazon EC2 instance topologies should this application be deployed on?<ul>"
                                + "<li>The Amazon EC2 instances should be deployed in a cluster placement group so that the underlying workload can benefit from low network latency and high network throughput</li>"
                                + "<li>The Amazon EC2 instances should be deployed in a spread placement group so that there are no correlated failures</li>"
                                + "<li>The Amazon EC2 instances should be deployed in an Auto Scaling group so that application meets high availability requirements</li>"
                                + "<li>The Amazon EC2 instances should be deployed in a partition placement group so that distributed workloads can be handled effectively</li></ul>", "back": "<b>The Amazon EC2 instances should be deployed in a cluster placement group so that the underlying workload can benefit from low network latency and high network throughput</b>" }
  , { "exam": "SAA-C03", "front": "An IT security consultancy is working on a solution to protect data stored in Amazon S3 from any malicious activity as well as check for any vulnerabilities on Amazon EC2 instances.As a solutions architect, which of the following solutions would you suggest to help address the given requirement?<ul>"
                                + "<li>Use Amazon GuardDuty to monitor any malicious activity on data stored in Amazon S3. Use security assessments provided by Amazon GuardDuty to check for vulnerabilities on Amazon EC2 instances</li>"
                                + "<li>Use Amazon Inspector to monitor any malicious activity on data stored in Amazon S3. Use security assessments provided by Amazon GuardDuty to check for vulnerabilities on Amazon EC2 instances</li>"
                                + "<li>Use Amazon GuardDuty to monitor any malicious activity on data stored in Amazon S3. Use security assessments provided by Amazon Inspector to check for vulnerabilities on Amazon EC2 instances</li>"
                                + "<li>Use Amazon Inspector to monitor any malicious activity on data stored in Amazon S3. Use security assessments provided by Amazon Inspector to check for vulnerabilities on Amazon EC2 instances</li></ul>", "back": "<b>Use Amazon GuardDuty to monitor any malicious activity on data stored in Amazon S3. Use security assessments provided by Amazon Inspector to check for vulnerabilities on Amazon EC2 instances</b>" }
  , { "exam": "SAA-C03", "front": "A retail company has developed a REST API which is deployed in an Auto Scaling group behind an Application Load Balancer. The REST API stores the user data in Amazon DynamoDB and any static content, such as images, are served via Amazon Simple Storage Service (Amazon S3). On analyzing the usage trends, it is found that 90% of the read requests are for commonly accessed data across all users.As a Solutions Architect, which of the following would you suggest as the MOST efficient solution to improve the application performance?<ul>"
                                + "<li>Enable Amazon DynamoDB Accelerator (DAX) for Amazon DynamoDB and ElastiCache Memcached for Amazon S3</li>"
                                + "<li>Enable ElastiCache Redis for DynamoDB and Amazon CloudFront for Amazon S3</li>"
                                + "<li>Enable Amazon DynamoDB Accelerator (DAX) for Amazon DynamoDB and Amazon CloudFront for Amazon S3</li>"
                                + "<li>Enable ElastiCache Redis for DynamoDB and ElastiCache Memcached for Amazon S3</li></ul>", "back": "<b>Enable Amazon DynamoDB Accelerator (DAX) for Amazon DynamoDB and Amazon CloudFront for Amazon S3</b>" }
  , { "exam": "SAA-C03", "front": "A company has moved its business critical data to Amazon Elastic File System (Amazon EFS) which will be accessed by multiple Amazon EC2 instances.As an AWS Certified Solutions Architect - Associate, which of the following would you recommend to exercise access control such that only the permitted Amazon EC2 instances can read from the Amazon EFS file system? (Select two)<ul>"
                                + "<li>Use an IAM policy to control access for clients who can mount your file system with the required permissions</li>"
                                + "<li>Use network access control list (network ACL) to control the network traffic to and from your Amazon EC2 instance</li>"
                                + "<li>Use VPC security groups to control the network traffic to and from your file system</li>"
                                + "<li>Set up the IAM policy root credentials to control and configure the clients accessing the Amazon EFS file system</li>"
                                + "<li>Use Amazon GuardDuty to curb unwanted access to Amazon EFS file system</li></ul>", "back": "<b>Use an IAM policy to control access for clients who can mount your file system with the required permissions, Use VPC security groups to control the network traffic to and from your file system</b>" }
  , { "exam": "SAA-C03", "front": "A major bank is using Amazon Simple Queue Service (Amazon SQS) to migrate several core banking applications to the cloud to ensure high availability and cost efficiency while simplifying administrative complexity and overhead. The development team at the bank expects a peak rate of about 1000 messages per second to be processed via SQS. It is important that the messages are processed in order.Which of the following options can be used to implement this system?<ul>"
                                + "<li>Use Amazon SQS standard queue to process the messages</li>"
                                + "<li>Use Amazon SQS FIFO (First-In-First-Out) queue to process the messages</li>"
                                + "<li>Use Amazon SQS FIFO (First-In-First-Out) queue in batch mode of 2 messages per operation to process the messages at the peak rate</li>"
                                + "<li>Use Amazon SQS FIFO (First-In-First-Out) queue in batch mode of 4 messages per operation to process the messages at the peak rate</li></ul>", "back": "<b>Use Amazon SQS FIFO (First-In-First-Out) queue in batch mode of 4 messages per operation to process the messages at the peak rate</b>" }
  , { "exam": "SAA-C03", "front": "A financial services company operates a containerized microservices architecture using Kubernetes in its on-premises data center. Due to strict industry regulations and internal security policies, all application data and workloads must remain physically within the on-premises environment. The company’s infrastructure team wants to modernize its Kubernetes stack and take advantage of AWS-managed services and APIs, including automated Kubernetes upgrades, Amazon CloudWatch integration, and access to AWS IAM features — but without migrating any data or compute resources to the cloud.Which AWS solution will best meet the company’s requirements for modernization while ensuring that all data remains on premises?<ul>"
                                + "<li>Install an AWS Outposts rack in the company’s data center. Use Amazon EKS Anywhere on Outposts to run containerized workloads locally while integrating with AWS APIs</li>"
                                + "<li>Deploy Amazon ECS with Fargate in a nearby AWS Local Zone. Use CloudWatch Logs to forward events to the primary region. Connect the Local Zone to the company’s data center over a VPN. Configure containers to pull data from on-premises storage through a mounted file share</li>"
                                + "<li>Use an AWS Snowball Edge Compute Optimized device to run EKS-compatible Docker containers on-site. Periodically export application logs and container snapshots to Amazon S3 using Snowball’s offline data transfer features. Use the Snowball console to orchestrate workloads in batches</li>"
                                + "<li>Set up a dedicated AWS Direct Connect connection between the on-premises environment and an AWS Region. Deploy Amazon EKS in the cloud and connect it to the local Kubernetes cluster. Use IAM roles and API Gateway to integrate authentication and traffic flow for hybrid workloads</li></ul>", "back": "<b>Install an AWS Outposts rack in the company’s data center. Use Amazon EKS Anywhere on Outposts to run containerized workloads locally while integrating with AWS APIs</b>" }
  , { "exam": "SAA-C03", "front": "A logistics company is building a multi-tier application to track the location of its trucks during peak operating hours. The company wants these data points to be accessible in real-time in its analytics platform via a REST API. The company has hired you as an AWS Certified Solutions Architect Associate to build a multi-tier solution to store and retrieve this location data for analysis.Which of the following options addresses the given use case?<ul>"
                                + "<li>Leverage Amazon QuickSight with Amazon Redshift</li>"
                                + "<li>Leverage Amazon API Gateway with Amazon Kinesis Data Analytics</li>"
                                + "<li>Leverage Amazon API Gateway with AWS Lambda</li>"
                                + "<li>Leverage Amazon Athena with Amazon S3</li></ul>", "back": "<b>Leverage Amazon API Gateway with Amazon Kinesis Data Analytics</b>" }
  , { "exam": "SAA-C03", "front": "A technology blogger wants to write a review on the comparative pricing for various storage types available on AWS Cloud. The blogger has created a test file of size 1 gigabytes with some random data. Next he copies this test file into AWS S3 Standard storage class, provisions an Amazon EBS volume (General Purpose SSD (gp2)) with 100 gigabytes of provisioned storage and copies the test file into the Amazon EBS volume, and lastly copies the test file into an Amazon EFS Standard Storage filesystem. At the end of the month, he analyses the bill for costs incurred on the respective storage types for the test file.What is the correct order of the storage charges incurred for the test file on these three storage types?<ul>"
                                + "<li>Cost of test file storage on Amazon S3 Standard < Cost of test file storage on Amazon EFS < Cost of test file storage on Amazon EBS</li>"
                                + "<li>Cost of test file storage on Amazon S3 Standard < Cost of test file storage on Amazon EBS < Cost of test file storage on Amazon EFS</li>"
                                + "<li>Cost of test file storage on Amazon EBS < Cost of test file storage on Amazon S3 Standard < Cost of test file storage on Amazon EFS</li>"
                                + "<li>Cost of test file storage on Amazon EFS < Cost of test file storage on Amazon S3 Standard < Cost of test file storage on Amazon EBS</li></ul>", "back": "<b>Cost of test file storage on Amazon S3 Standard < Cost of test file storage on Amazon EFS < Cost of test file storage on Amazon EBS</b>" }
  , { "exam": "SAA-C03", "front": "One of the biggest football leagues in Europe has granted the distribution rights for live streaming its matches in the USA to a silicon valley based streaming services company. As per the terms of distribution, the company must make sure that only users from the USA are able to live stream the matches on their platform. Users from other countries in the world must be denied access to these live-streamed matches.Which of the following options would allow the company to enforce these streaming restrictions? (Select two)<ul>"
                                + "<li>Use Amazon Route 53 based weighted routing policy to restrict distribution of content to only the locations in which you have distribution rights</li>"
                                + "<li>Use georestriction to prevent users in specific geographic locations from accessing content that you're distributing through a Amazon CloudFront web distribution</li>"
                                + "<li>Use Amazon Route 53 based geolocation routing policy to restrict distribution of content to only the locations in which you have distribution rights</li>"
                                + "<li>Use Amazon Route 53 based failover routing policy to restrict distribution of content to only the locations in which you have distribution rights</li>"
                                + "<li>Use Amazon Route 53 based latency-based routing policy to restrict distribution of content to only the locations in which you have distribution rights</li></ul>", "back": "<b>Use georestriction to prevent users in specific geographic locations from accessing content that you're distributing through a Amazon CloudFront web distribution, Use Amazon Route 53 based geolocation routing policy to restrict distribution of content to only the locations in which you have distribution rights</b>" }
  , { "exam": "SAA-C03", "front": "A healthcare company uses its on-premises infrastructure to run legacy applications that require specialized customizations to the underlying Oracle database as well as its host operating system (OS). The company also wants to improve the availability of the Oracle database layer. The company has hired you as an AWS Certified Solutions Architect – Associate to build a solution on AWS that meets these requirements while minimizing the underlying infrastructure maintenance effort.Which of the following options represents the best solution for this use case?<ul>"
                                + "<li>Deploy the Oracle database layer on multiple Amazon EC2 instances spread across two Availability Zones (AZs). This deployment configuration guarantees high availability and also allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system</li>"
                                + "<li>Leverage multi-AZ configuration of Amazon RDS Custom for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system</li>"
                                + "<li>Leverage cross AZ read-replica configuration of Amazon RDS for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system</li>"
                                + "<li>Leverage multi-AZ configuration of Amazon RDS for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system</li></ul>", "back": "<b>Leverage multi-AZ configuration of Amazon RDS Custom for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system</b>" }
  , { "exam": "SAA-C03", "front": "The sourcing team at the US headquarters of a global e-commerce company is preparing a spreadsheet of the new product catalog. The spreadsheet is saved on an Amazon Elastic File System (Amazon EFS) created in us-east-1 region. The sourcing team counterparts from other AWS regions such as Asia Pacific and Europe also want to collaborate on this spreadsheet.As a solutions architect, what is your recommendation to enable this collaboration with the LEAST amount of operational overhead?<ul>"
                                + "<li>The spreadsheet data will have to be moved into an Amazon RDS for MySQL database which can then be accessed from any AWS region</li>"
                                + "<li>The spreadsheet will have to be copied in Amazon S3 which can then be accessed from any AWS region</li>"
                                + "<li>The spreadsheet on the Amazon Elastic File System (Amazon EFS) can be accessed in other AWS regions by using an inter-region VPC peering connection</li>"
                                + "<li>The spreadsheet will have to be copied into Amazon EFS file systems of other AWS regions as Amazon EFS is a regional service and it does not allow access from other AWS regions</li></ul>", "back": "<b>The spreadsheet on the Amazon Elastic File System (Amazon EFS) can be accessed in other AWS regions by using an inter-region VPC peering connection</b>" }
  , { "exam": "SAA-C03", "front": "The solo founder at a tech startup has just created a brand new AWS account. The founder has provisioned an Amazon EC2 instance 1A which is running in AWS Region A. Later, he takes a snapshot of the instance 1A and then creates a new Amazon Machine Image (AMI) in Region A from this snapshot. This AMI is then copied into another Region B. The founder provisions an instance 1B in Region B using this new AMI in Region B.At this point in time, what entities exist in Region B?<ul>"
                                + "<li>1 Amazon EC2 instance and 1 AMI exist in Region B</li>"
                                + "<li>1 Amazon EC2 instance and 1 snapshot exist in Region B</li>"
                                + "<li>1 Amazon EC2 instance and 2 AMIs exist in Region B</li>"
                                + "<li>1 Amazon EC2 instance, 1 AMI and 1 snapshot exist in Region B</li></ul>", "back": "<b>1 Amazon EC2 instance, 1 AMI and 1 snapshot exist in Region B</b>" }
  , { "exam": "SAA-C03", "front": "A data analytics company measures what the consumers watch and what advertising they’re exposed to. This real-time data is ingested into its on-premises data center and subsequently, the daily data feed is compressed into a single file and uploaded on Amazon S3 for backup. The typical compressed file size is around 2 gigabytes.Which of the following is the fastest way to upload the daily compressed file into Amazon S3?<ul>"
                                + "<li>Upload the compressed file using multipart upload with Amazon S3 Transfer Acceleration (Amazon S3TA)</li>"
                                + "<li>Upload the compressed file in a single operation</li>"
                                + "<li>Upload the compressed file using multipart upload</li>"
                                + "<li>FTP the compressed file into an Amazon EC2 instance that runs in the same region as the Amazon S3 bucket. Then transfer the file from the Amazon EC2 instance into the Amazon S3 bucket</li></ul>", "back": "<b>Upload the compressed file using multipart upload with Amazon S3 Transfer Acceleration (Amazon S3TA)</b>" }
  , { "exam": "SAA-C03", "front": "The flagship application for a gaming company connects to an Amazon Aurora database and the entire technology stack is currently deployed in the United States. Now, the company has plans to expand to Europe and Asia for its operations. It needs the games table to be accessible globally but needs the users and games_played tables to be regional only.How would you implement this with minimal application refactoring?<ul>"
                                + "<li>Use an Amazon Aurora Global Database for the games table and use Amazon DynamoDB tables for the users and games_played tables</li>"
                                + "<li>Use a Amazon DynamoDB global table for the games table and use Amazon Aurora for the users and games_played tables</li>"
                                + "<li>Use an Amazon Aurora Global Database for the games table and use Amazon Aurora for the users and games_played tables</li>"
                                + "<li>Use a Amazon DynamoDB global table for the games table and use Amazon DynamoDB tables for the users and games_played tables</li></ul>", "back": "<b>Use an Amazon Aurora Global Database for the games table and use Amazon Aurora for the users and games_played tables</b>" }
  , { "exam": "SAA-C03", "front": "A gaming company is looking at improving the availability and performance of its global flagship application which utilizes User Datagram Protocol and needs to support fast regional failover in case an AWS Region goes down. The company wants to continue using its own custom Domain Name System (DNS) service.Which of the following AWS services represents the best solution for this use-case?<ul>"
                                + "<li>AWS Elastic Load Balancing (ELB)</li>"
                                + "<li>Amazon CloudFront</li>"
                                + "<li>AWS Global Accelerator</li>"
                                + "<li>Amazon Route 53</li></ul>", "back": "<b>AWS Global Accelerator</b>" }
  , { "exam": "SAA-C03", "front": "A retail analytics company operates a large-scale data lake on Amazon S3, where they store daily logs of customer transactions, product views, and inventory updates. Each morning, they need to transform and load the data into a data warehouse to support fast analytical queries. The company also wants to enable data analysts to build and train machine learning (ML) models using familiar SQL syntax without writing custom Python code. The architecture must support massively parallel processing (MPP) for fast data aggregation and scoring, and must use serverless AWS services wherever possible to reduce infrastructure management and operational overhead.Which solution best meets these requirements?<ul>"
                                + "<li>Use an AWS Glue job to transform and load data into Amazon RDS for PostgreSQL. Allow analysts to run machine learning models using Amazon Aurora ML integrated with PostgreSQL, leveraging Amazon SageMaker endpoints behind the scenes</li>"
                                + "<li>Use a daily AWS Glue job to transform and clean the data stored in Amazon S3. Load the transformed dataset into Amazon Redshift Serverless, which offers MPP capabilities in a serverless model. Enable analysts to use Amazon Redshift ML to build and train ML models</li>"
                                + "<li>Provision and run a daily Amazon EMR cluster with Apache Spark to process and transform the S3 data. Load the results into Amazon Redshift (provisioned). Enable ML model development by integrating Redshift with Amazon SageMaker notebooks for advanced modeling tasks</li>"
                                + "<li>Run a daily AWS Glue job to process and transform the raw files in S3 and register the outputs as Amazon Athena tables in AWS Glue Data Catalog. Allow analysts to build ML models using Amazon Athena ML, with SQL-based predictions on top of S3 data without moving it to a warehouse</li></ul>", "back": "<b>Use a daily AWS Glue job to transform and clean the data stored in Amazon S3. Load the transformed dataset into Amazon Redshift Serverless, which offers MPP capabilities in a serverless model. Enable analysts to use Amazon Redshift ML to build and train ML models</b>" }
  , { "exam": "SAA-C03", "front": "While consolidating logs for the weekly reporting, a development team at an e-commerce company noticed that an unusually large number of illegal AWS application programming interface (API) queries were made sometime during the week. Due to the off-season, there was no visible impact on the systems. However, this event led the management team to seek an automated solution that can trigger near-real-time warnings in case such an event recurs.Which of the following represents the best solution for the given scenario?<ul>"
                                + "<li>Configure AWS CloudTrail to stream event data to Amazon Kinesis. Use Amazon Kinesis stream-level metrics in the Amazon CloudWatch to trigger an AWS Lambda function that will trigger an error workflow</li>"
                                + "<li>AWS Trusted Advisor publishes metrics about check results to Amazon CloudWatch. Create an alarm to track status changes for checks in the Service Limits category for the APIs. The alarm will then notify when the service quota is reached or exceeded</li>"
                                + "<li>Create an Amazon CloudWatch metric filter that processes AWS CloudTrail logs having API call details and looks at any errors by factoring in all the error codes that need to be tracked. Create an alarm based on this metric's rate to send an Amazon SNS notification to the required team</li>"
                                + "<li>Run Amazon Athena SQL queries against AWS CloudTrail log files stored in Amazon S3 buckets. Use Amazon QuickSight to generate reports for managerial dashboards</li></ul>", "back": "<b>Create an Amazon CloudWatch metric filter that processes AWS CloudTrail logs having API call details and looks at any errors by factoring in all the error codes that need to be tracked. Create an alarm based on this metric's rate to send an Amazon SNS notification to the required team</b>" }
  , { "exam": "SAA-C03", "front": "A research group runs its flagship application on a fleet of Amazon EC2 instances for a specialized task that must deliver high random I/O performance. Each instance in the fleet would have access to a dataset that is replicated across the instances by the application itself. Because of the resilient application architecture, the specialized task would continue to be processed even if any instance goes down, as the underlying application would ensure the replacement instance has access to the required dataset.Which of the following options is the MOST cost-optimal and resource-efficient solution to build this fleet of Amazon EC2 instances?<ul>"
                                + "<li>Use Amazon Elastic Block Store (Amazon EBS) based EC2 instances</li>"
                                + "<li>Use Amazon EC2 instances with access to Amazon S3 based storage</li>"
                                + "<li>Use Instance Store based Amazon EC2 instances</li>"
                                + "<li>Use Amazon EC2 instances with Amazon EFS mount points</li></ul>", "back": "<b>Use Instance Store based Amazon EC2 instances</b>" }
  , { "exam": "SAA-C03", "front": "The development team at an e-commerce startup has set up multiple microservices running on Amazon EC2 instances under an Application Load Balancer. The team wants to route traffic to multiple back-end services based on the URL path of the HTTP header. So it wants requests for https://www.example.com/orders to go to a specific microservice and requests for https://www.example.com/products to go to another microservice.Which of the following features of Application Load Balancers can be used for this use-case?<ul>"
                                + "<li>Host-based Routing</li>"
                                + "<li>Query string parameter-based routing</li>"
                                + "<li>HTTP header-based routing</li>"
                                + "<li>Path-based Routing</li></ul>", "back": "<b>Path-based Routing</b>" }
  , { "exam": "SAA-C03", "front": "A gaming company is developing a mobile game that streams score updates to a backend processor and then publishes results on a leaderboard. The company has hired you as an AWS Certified Solutions Architect Associate to design a solution that can handle major traffic spikes, process the mobile game updates in the order of receipt, and store the processed updates in a highly available database. The company wants to minimize the management overhead required to maintain the solution.Which of the following will you recommend to meet these requirements?<ul>"
                                + "<li>Push score updates to Amazon Kinesis Data Streams which uses an AWS Lambda function to process these updates and then store these processed updates in Amazon DynamoDB</li>"
                                + "<li>Push score updates to Amazon Kinesis Data Streams which uses a fleet of Amazon EC2 instances (with Auto Scaling) to process the updates in Amazon Kinesis Data Streams and then store these processed updates in Amazon DynamoDB</li>"
                                + "<li>Push score updates to an Amazon Simple Notification Service (Amazon SNS) topic, subscribe an AWS Lambda function to this Amazon SNS topic to process the updates and then store these processed updates in a SQL database running on Amazon EC2 instance</li>"
                                + "<li>Push score updates to an Amazon Simple Queue Service (Amazon SQS) queue which uses a fleet of Amazon EC2 instances (with Auto Scaling) to process these updates in the Amazon SQS queue and then store these processed updates in an Amazon RDS MySQL database</li></ul>", "back": "<b>Push score updates to Amazon Kinesis Data Streams which uses an AWS Lambda function to process these updates and then store these processed updates in Amazon DynamoDB</b>" }
  , { "exam": "SAA-C03", "front": "The engineering team at an in-home fitness company is evaluating multiple in-memory data stores with the ability to power its on-demand, live leaderboard. The company's leaderboard requires high availability, low latency, and real-time processing to deliver customizable user data for the community of users working out together virtually from the comfort of their home.As a solutions architect, which of the following solutions would you recommend? (Select two)<ul>"
                                + "<li>Power the on-demand, live leaderboard using Amazon DynamoDB with DynamoDB Accelerator (DAX) as it meets the in-memory, high availability, low latency requirements</li>"
                                + "<li>Power the on-demand, live leaderboard using Amazon Neptune as it meets the in-memory, high availability, low latency requirements</li>"
                                + "<li>Power the on-demand, live leaderboard using Amazon DynamoDB as it meets the in-memory, high availability, low latency requirements</li>"
                                + "<li>Power the on-demand, live leaderboard using Amazon ElastiCache for Redis as it meets the in-memory, high availability, low latency requirements</li>"
                                + "<li>Power the on-demand, live leaderboard using Amazon RDS for Aurora as it meets the in-memory, high availability, low latency requirements</li></ul>", "back": "<b>Power the on-demand, live leaderboard using Amazon DynamoDB with DynamoDB Accelerator (DAX) as it meets the in-memory, high availability, low latency requirements, Power the on-demand, live leaderboard using Amazon ElastiCache for Redis as it meets the in-memory, high availability, low latency requirements</b>" }
  , { "exam": "SAA-C03", "front": "An Electronic Design Automation (EDA) application produces massive volumes of data that can be divided into two categories. The 'hot data' needs to be both processed and stored quickly in a parallel and distributed fashion. The 'cold data' needs to be kept for reference with quick access for reads and updates at a low cost.Which of the following AWS services is BEST suited to accelerate the aforementioned chip design process?<ul>"
                                + "<li>Amazon FSx for Windows File Server</li>"
                                + "<li>Amazon EMR</li>"
                                + "<li>Amazon FSx for Lustre</li>"
                                + "<li>AWS Glue</li></ul>", "back": "<b>Amazon FSx for Lustre</b>" }
  , { "exam": "SAA-C03", "front": "A leading carmaker would like to build a new car-as-a-sensor service by leveraging fully serverless components that are provisioned and managed automatically by AWS. The development team at the carmaker does not want an option that requires the capacity to be manually provisioned, as it does not want to respond manually to changing volumes of sensor data.Given these constraints, which of the following solutions is the BEST fit to develop this car-as-a-sensor service?<ul>"
                                + "<li>Ingest the sensor data in an Amazon Simple Queue Service (Amazon SQS) standard queue, which is polled by an application running on an Amazon EC2 instance and the data is written into an auto-scaled Amazon DynamoDB table for downstream processing</li>"
                                + "<li>Ingest the sensor data in an Amazon Simple Queue Service (Amazon SQS) standard queue, which is polled by an AWS Lambda function in batches and the data is written into an auto-scaled Amazon DynamoDB table for downstream processing</li>"
                                + "<li>Ingest the sensor data in Amazon Kinesis Data Firehose, which directly writes the data into an auto-scaled Amazon DynamoDB table for downstream processing</li>"
                                + "<li>Ingest the sensor data in Amazon Kinesis Data Streams, which is polled by an application running on an Amazon EC2 instance and the data is written into an auto-scaled Amazon DynamoDB table for downstream processing</li></ul>", "back": "<b>Ingest the sensor data in an Amazon Simple Queue Service (Amazon SQS) standard queue, which is polled by an AWS Lambda function in batches and the data is written into an auto-scaled Amazon DynamoDB table for downstream processing</b>" }
  , { "exam": "SAA-C03", "front": "A new DevOps engineer has joined a large financial services company recently. As part of his onboarding, the IT department is conducting a review of the checklist for tasks related to AWS Identity and Access Management (AWS IAM).As an AWS Certified Solutions Architect – Associate, which best practices would you recommend (Select two)?<ul>"
                                + "<li>Grant maximum privileges to avoid assigning privileges again</li>"
                                + "<li>Configure AWS CloudTrail to log all AWS Identity and Access Management (AWS IAM) actions</li>"
                                + "<li>Enable AWS Multi-Factor Authentication (AWS MFA) for privileged users</li>"
                                + "<li>Use user credentials to provide access specific permissions for Amazon EC2 instances</li>"
                                + "<li>Create a minimum number of accounts and share these account credentials among employees</li></ul>", "back": "<b>Configure AWS CloudTrail to log all AWS Identity and Access Management (AWS IAM) actions, Enable AWS Multi-Factor Authentication (AWS MFA) for privileged users</b>" }
  , { "exam": "SAA-C03", "front": "A company uses Amazon S3 buckets for storing sensitive customer data. The company has defined different retention periods for different objects present in the Amazon S3 buckets, based on the compliance requirements. But, the retention rules do not seem to work as expected.Which of the following options represent a valid configuration for setting up retention periods for objects in Amazon S3 buckets? (Select two)<ul>"
                                + "<li>The bucket default settings will override any explicit retention mode or period you request on an object version</li>"
                                + "<li>When you apply a retention period to an object version explicitly, you specify a Retain Until Date for the object version</li>"
                                + "<li>When you use bucket default settings, you specify a Retain Until Date for the object version</li>"
                                + "<li>Different versions of a single object can have different retention modes and periods</li>"
                                + "<li>You cannot place a retention period on an object version through a bucket default setting</li></ul>", "back": "<b>When you apply a retention period to an object version explicitly, you specify a Retain Until Date for the object version, Different versions of a single object can have different retention modes and periods</b>" }
  , { "exam": "SAA-C03", "front": "A news network uses Amazon Simple Storage Service (Amazon S3) to aggregate the raw video footage from its reporting teams across the US. The news network has recently expanded into new geographies in Europe and Asia. The technical teams at the overseas branch offices have reported huge delays in uploading large video files to the destination Amazon S3 bucket.Which of the following are the MOST cost-effective options to improve the file upload speed into Amazon S3 (Select two)<ul>"
                                + "<li>Create multiple AWS Direct Connect connections between the AWS Cloud and branch offices in Europe and Asia. Use the direct connect connections for faster file uploads into Amazon S3</li>"
                                + "<li>Use multipart uploads for faster file uploads into the destination Amazon S3 bucket</li>"
                                + "<li>Create multiple AWS Site-to-Site VPN connections between the AWS Cloud and branch offices in Europe and Asia. Use these VPN connections for faster file uploads into Amazon S3</li>"
                                + "<li>Use AWS Global Accelerator for faster file uploads into the destination Amazon S3 bucket</li>"
                                + "<li>Use Amazon S3 Transfer Acceleration (Amazon S3TA) to enable faster file uploads into the destination S3 bucket</li></ul>", "back": "<b>Use multipart uploads for faster file uploads into the destination Amazon S3 bucket, Use Amazon S3 Transfer Acceleration (Amazon S3TA) to enable faster file uploads into the destination S3 bucket</b>" }
  , { "exam": "SAA-C03", "front": "An e-commerce company is looking for a solution with high availability, as it plans to migrate its flagship application to a fleet of Amazon Elastic Compute Cloud (Amazon EC2) instances. The solution should allow for content-based routing as part of the architecture.As a Solutions Architect, which of the following will you suggest for the company?<ul>"
                                + "<li>Use an Auto Scaling group for distributing traffic to the Amazon EC2 instances spread across different Availability Zones (AZs). Configure a Public IP address to mask any failure of an instance</li>"
                                + "<li>Use an Auto Scaling group for distributing traffic to the Amazon EC2 instances spread across different Availability Zones (AZs). Configure an elastic IP address (EIP) to mask any failure of an instance</li>"
                                + "<li>Use an Application Load Balancer for distributing traffic to the Amazon EC2 instances spread across different Availability Zones (AZs). Configure Auto Scaling group to mask any failure of an instance</li>"
                                + "<li>Use a Network Load Balancer for distributing traffic to the Amazon EC2 instances spread across different Availability Zones (AZs). Configure a Private IP address to mask any failure of an instance</li></ul>", "back": "<b>Use an Application Load Balancer for distributing traffic to the Amazon EC2 instances spread across different Availability Zones (AZs). Configure Auto Scaling group to mask any failure of an instance</b>" }
  , { "exam": "SAA-C03", "front": "A biotechnology firm runs genomics data analysis workloads using AWS Lambda functions deployed inside a VPC in their central AWS account. The input data for these workloads consists of large files stored in an Amazon Elastic File System (Amazon EFS) that resides in a separate AWS account managed by a research partner. The firm wants the Lambda function in their account to access the shared EFS storage directly. The access pattern and file volume are expected to grow as additional research datasets are added over time, so the solution must be scalable and cost-efficient, and should require minimal operational overhead.Which solution best meets these requirements in the MOST cost-effective way?<ul>"
                                + "<li>Set up an Amazon S3 bucket in the research partner’s account and periodically copy EFS contents into the bucket using scheduled AWS DataSync jobs. Use Amazon S3 Access Points to expose the data to the Lambda function in the central account, allowing access via S3 API calls instead of file system mounts</li>"
                                + "<li>Create a second Lambda function in the research partner's account that mounts the EFS file system locally. Have the main Lambda function in the central account invoke this secondary Lambda via Amazon API Gateway for data access and computation. Use IAM cross-account permissions to allow invocation</li>"
                                + "<li>Use Amazon EFS resource policies to allow cross-account access to the file system from the central account. Attach the EFS mount target to a shared VPC or peered VPC, and mount the file system in the Lambda function configuration using an EFS access point</li>"
                                + "<li>Package the genomic input data as a Lambda layer and publish it in the research partner's account. Share the layer across accounts by modifying its resource policy and attach the layer to the Lambda function in the central account to access the data during execution</li></ul>", "back": "<b>Use Amazon EFS resource policies to allow cross-account access to the file system from the central account. Attach the EFS mount target to a shared VPC or peered VPC, and mount the file system in the Lambda function configuration using an EFS access point</b>" }
  , { "exam": "SAA-C03", "front": "The engineering team at a data analytics company has observed that its flagship application functions at its peak performance when the underlying Amazon Elastic Compute Cloud (Amazon EC2) instances have a CPU utilization of about 50%. The application is built on a fleet of Amazon EC2 instances managed under an Auto Scaling group. The workflow requests are handled by an internal Application Load Balancer that routes the requests to the instances.As a solutions architect, what would you recommend so that the application runs near its peak performance state?<ul>"
                                + "<li>Configure the Auto Scaling group to use simple scaling policy and set the CPU utilization as the target metric with a target value of 50%</li>"
                                + "<li>Configure the Auto Scaling group to use target tracking policy and set the CPU utilization as the target metric with a target value of 50%</li>"
                                + "<li>Configure the Auto Scaling group to use a Amazon Cloudwatch alarm triggered on a CPU utilization threshold of 50%</li>"
                                + "<li>Configure the Auto Scaling group to use step scaling policy and set the CPU utilization as the target metric with a target value of 50%</li></ul>", "back": "<b>Configure the Auto Scaling group to use target tracking policy and set the CPU utilization as the target metric with a target value of 50%</b>" }
  , { "exam": "SAA-C03", "front": "An organization wants to delegate access to a set of users from the development environment so that they can access some resources in the production environment which is managed under another AWS account.As a solutions architect, which of the following steps would you recommend?<ul>"
                                + "<li>Both IAM roles and IAM users can be used interchangeably for cross-account access</li>"
                                + "<li>Create new IAM user credentials for the production environment and share these credentials with the set of users from the development environment</li>"
                                + "<li>It is not possible to access cross-account resources</li>"
                                + "<li>Create a new IAM role with the required permissions to access the resources in the production environment. The users can then assume this IAM role while accessing the resources from the production environment</li></ul>", "back": "<b>Create a new IAM role with the required permissions to access the resources in the production environment. The users can then assume this IAM role while accessing the resources from the production environment</b>" }
  , { "exam": "SAA-C03", "front": "The DevOps team at an e-commerce company has deployed a fleet of Amazon EC2 instances under an Auto Scaling group (ASG). The instances under the ASG span two Availability Zones (AZ) within the us-east-1 region. All the incoming requests are handled by an Application Load Balancer (ALB) that routes the requests to the Amazon EC2 instances under the Auto Scaling Group. As part of a test run, two instances (instance 1 and 2, belonging to AZ A) were manually terminated by the DevOps team causing the Availability Zones (AZ) to have unbalanced resources. Later that day, another instance (belonging to AZ B) was detected as unhealthy by the Application Load Balancer's health check.Can you identify the correct outcomes for these events? (Select two)<ul>"
                                + "<li>As the resources are unbalanced in the Availability Zones, Amazon EC2 Auto Scaling will compensate by rebalancing the Availability Zones. When rebalancing, Amazon EC2 Auto Scaling launches new instances before terminating the old ones, so that rebalancing does not compromise the performance or availability of your application</li>"
                                + "<li>Amazon EC2 Auto Scaling creates a new scaling activity for terminating the unhealthy instance and then terminates it. Later, another scaling activity launches a new instance to replace the terminated instance</li>"
                                + "<li>Amazon EC2 Auto Scaling creates a new scaling activity to terminate the unhealthy instance and launch the new instance simultaneously</li>"
                                + "<li>Amazon EC2 Auto Scaling creates a new scaling activity for launching a new instance to replace the unhealthy instance. Later, Amazon EC2 Auto Scaling creates a new scaling activity for terminating the unhealthy instance and then terminates it</li>"
                                + "<li>As the resources are unbalanced in the Availability Zones, Amazon EC2 Auto Scaling will compensate by rebalancing the Availability Zones. When rebalancing, Amazon EC2 Auto Scaling terminates old instances before launching new instances, so that rebalancing does not cause extra instances to be launched</li></ul>", "back": "<b>As the resources are unbalanced in the Availability Zones, Amazon EC2 Auto Scaling will compensate by rebalancing the Availability Zones. When rebalancing, Amazon EC2 Auto Scaling launches new instances before terminating the old ones, so that rebalancing does not compromise the performance or availability of your application, Amazon EC2 Auto Scaling creates a new scaling activity for terminating the unhealthy instance and then terminates it. Later, another scaling activity launches a new instance to replace the terminated instance</b>" }
  , { "exam": "SAA-C03", "front": "A file-hosting service uses Amazon Simple Storage Service (Amazon S3) under the hood to power its storage offerings. Currently all the customer files are uploaded directly under a single Amazon S3 bucket. The engineering team has started seeing scalability issues where customer file uploads have started failing during the peak access hours with more than 5000 requests per second.Which of the following is the MOST resource efficient and cost-optimal way of addressing this issue?<ul>"
                                + "<li>Change the application architecture to create a new Amazon S3 bucket for each customer and then upload each customer's files directly under the respective buckets</li>"
                                + "<li>Change the application architecture to use Amazon Elastic File System (Amazon EFS) instead of Amazon S3 for storing the customers' uploaded files</li>"
                                + "<li>Change the application architecture to create a new Amazon S3 bucket for each day's data and then upload the daily files directly under that day's bucket</li>"
                                + "<li>Change the application architecture to create customer-specific custom prefixes within the single Amazon S3 bucket and then upload the daily files into those prefixed locations</li></ul>", "back": "<b>Change the application architecture to create customer-specific custom prefixes within the single Amazon S3 bucket and then upload the daily files into those prefixed locations</b>" }
  , { "exam": "SAA-C03", "front": "An audit department generates and accesses the audit reports only twice in a financial year. The department uses AWS Step Functions to orchestrate the report creating process that has failover and retry scenarios built into the solution. The underlying data to create these audit reports is stored on Amazon S3, runs into hundreds of Terabytes and should be available with millisecond latency.As an AWS Certified Solutions Architect – Associate, which is the MOST cost-effective storage class that you would recommend to be used for this use-case?<ul>"
                                + "<li>Amazon S3 Intelligent-Tiering (S3 Intelligent-Tiering)</li>"
                                + "<li>Amazon S3 Standard-Infrequent Access (S3 Standard-IA)</li>"
                                + "<li>Amazon S3 Standard</li>"
                                + "<li>Amazon S3 Glacier Deep Archive</li></ul>", "back": "<b>Amazon S3 Standard-Infrequent Access (S3 Standard-IA)</b>" }
  , { "exam": "SAA-C03", "front": "A leading video streaming service delivers billions of hours of content from Amazon Simple Storage Service (Amazon S3) to customers around the world. Amazon S3 also serves as the data lake for its big data analytics solution. The data lake has a staging zone where intermediary query results are kept only for 24 hours. These results are also heavily referenced by other parts of the analytics pipeline.Which of the following is the MOST cost-effective strategy for storing this intermediary query data?<ul>"
                                + "<li>Store the intermediary query results in Amazon S3 Standard-Infrequent Access storage class</li>"
                                + "<li>Store the intermediary query results in Amazon S3 Standard storage class</li>"
                                + "<li>Store the intermediary query results in Amazon S3 One Zone-Infrequent Access storage class</li>"
                                + "<li>Store the intermediary query results in Amazon S3 Glacier Instant Retrieval storage class</li></ul>", "back": "<b>Store the intermediary query results in Amazon S3 Standard storage class</b>" }
  , { "exam": "SAA-C03", "front": "A retail company runs a customer management system backed by a Microsoft SQL Server database. The system is tightly integrated with applications that rely on T-SQL queries. The company wants to modernize its infrastructure by migrating to Amazon Aurora PostgreSQL, but it needs to avoid major modifications to the existing application logic.Which combination of actions should the company take to achieve this goal with minimal application refactoring? (Select two)<ul>"
                                + "<li>Use AWS Glue to convert T-SQL queries to PostgreSQL-compatible SQL during the migration</li>"
                                + "<li>Use Amazon Aurora Global Database to replicate data across regions for compatibility</li>"
                                + "<li>Deploy Babelfish for Aurora PostgreSQL to enable support for T-SQL commands</li>"
                                + "<li>Configure Amazon Aurora PostgreSQL with a custom endpoint that emulates Microsoft SQL Server behavior</li>"
                                + "<li>Use AWS Schema Conversion Tool (AWS SCT) along with AWS Database Migration Service (AWS DMS) to migrate the schema and data</li></ul>", "back": "<b>Deploy Babelfish for Aurora PostgreSQL to enable support for T-SQL commands, Use AWS Schema Conversion Tool (AWS SCT) along with AWS Database Migration Service (AWS DMS) to migrate the schema and data</b>" }
  , { "exam": "SAA-C03", "front": "A development team requires permissions to list an Amazon S3 bucket and delete objects from that bucket. A systems administrator has created the following IAM policy to provide access to the bucket and applied that policy to the group. The group is not able to delete objects in the bucket. The company follows the principle of least privilege.<pre>    \"Version\": \"2021-10-17\",\n    \"Statement\": [\n        {\n            \"Action\": [\n                \"s3:ListBucket\",\n                \"s3:DeleteObject\"\n            ],\n            \"Resource\": [\n                \"arn:aws:s3:::example-bucket\"\n            ],\n            \"Effect\": \"Allow\"\n        }\n    ]</pre>Which statement should a solutions architect add to the policy to address this issue?<ul>"
                                + "<li>{\n    \"Action\": [\n        \"s3:*Object\"\n    ],\n    \"Resource\": [\n        \"arn:aws:s3:::example-bucket/*\"\n    ],\n    \"Effect\": \"Allow\"\n}</li>"
                                + "<li>{\n    \"Action\": [\n        \"s3:DeleteObject\"\n    ],\n    \"Resource\": [\n        \"arn:aws:s3:::example-bucket/*\"\n    ],\n    \"Effect\": \"Allow\"\n}</li>"
                                + "<li>{\n    \"Action\": [\n        \"s3:DeleteObject\"\n    ],\n    \"Resource\": [\n        \"arn:aws:s3:::example-bucket*\"\n    ],\n    \"Effect\": \"Allow\"\n}</li>"
                                + "<li>{\n    \"Action\": [\n        \"s3:*\"\n    ],\n    \"Resource\": [\n        \"arn:aws:s3:::example-bucket/*\"\n    ],\n    \"Effect\": \"Allow\"\n}</li></ul>", "back": "<b>{\n    \"Action\": [\n        \"s3:DeleteObject\"\n    ],\n    \"Resource\": [\n        \"arn:aws:s3:::example-bucket/*\"\n    ],\n    \"Effect\": \"Allow\"\n}</b>" }
];

/*
copy(`  , { "exam": "SAA-C03", "front": "${document.querySelector('#question-prompt').innerText.replaceAll('"',"'")}<ul>"\n                                + "<li>${Array.from(document.querySelectorAll('[aria-labelledby="question-prompt"] .ud-heading-md>div>div>div[data-purpose="safely-set-inner-html:rich-text-viewer:html"]')).map(x=>x.innerText.replaceAll('"',"'")).join('</li>"\n                                + "<li>')}</li></ul>", "back": "<b>${document.querySelector('.ud-text-xs').parentElement.parentElement.firstElementChild.innerText.replaceAll('"',"'")}</b> ${document.querySelector('[aria-labelledby="question-prompt"] .ud-heading-md .ud-text-sm div').innerText.replaceAll('"',"'")}" }\n`)
copy(`  , { "exam": "SAA-C03", "front": "${document.querySelector('#question-prompt').innerText.replaceAll('"',"'").replaceAll("\n","")}<ul>"\n                                + "<li>${Array.from(document.querySelectorAll('[data-purpose="answer"] [data-purpose="answer-body"] p')).map(x=>x.innerText.replaceAll('"',"'").replaceAll("\n","")).join('</li>"\n                                + "<li>')}</li></ul>", "back": "<b>${Array.from(document.querySelectorAll('[data-purpose="answer-result-header-user-label"]')).filter(x=>x.innerText.startsWith('Correct')||x.innerText.endsWith(' correct')).map(x=>x.parentElement.parentElement.querySelector('p').innerText).join(", ").replaceAll('"',"'").replaceAll("\n","")}</b>" }\n`)

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