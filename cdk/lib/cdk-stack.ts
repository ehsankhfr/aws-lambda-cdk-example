import * as cdk from 'aws-cdk-lib';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const helloWorldFunction = new NodejsFunction(this, 'helloWorld', {
            memorySize: 1024,
            timeout: cdk.Duration.seconds(5),
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: 'main',
            entry: path.join(__dirname, `./../../build/app.js`),
        });

        const api = new apigateway.RestApi(this, "helloWorldApi", {
            restApiName: "Hello World!",
            description: "This service serves hello-world API."
        });

        api.root.addMethod('GET', new apigateway.LambdaIntegration(helloWorldFunction, {}))
    }
}
