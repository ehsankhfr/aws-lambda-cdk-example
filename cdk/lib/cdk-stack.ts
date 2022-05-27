import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const helloWorldFunction = new lambda.Function(this, 'helloWorld', {
            runtime: lambda.Runtime.NODEJS_16_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler'
        });

        const api = new apigateway.RestApi(this, "helloWorldApi", {
            restApiName: "Hello World!",
            description: "This service serves hello-world API."
        });

        api.root.addMethod('GET', new apigateway.LambdaIntegration(helloWorldFunction, {}))
    }
}
