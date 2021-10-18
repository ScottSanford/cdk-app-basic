import * as cdk from '@aws-cdk/core'
import * as ecs from '@aws-cdk/aws-ecs'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns'

export class CdkAppBasicStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here
    // Create VPC & Fargate Cluster
    const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 2 })
    const cluster = new ecs.Cluster(this, 'Cluster', { vpc })
    
    // Instantiate Fargate Service with just cluster and image
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'FargateService', {
      cluster,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample')
      }
    })
  }
}
