import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigatewayv2';
import {HttpLambdaIntegration} from '@aws-cdk/aws-apigatewayv2-integrations';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const helloWorldFunction = new lambda.NodejsFunction(this, 'helloWorld', {
            entry: '../../src/hello.ts',
            functionName: 'hello',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(10),
            bundling: {
                minify: true, // minify code, defaults to false
                sourceMap: true, // include source map, defaults to false
                sourceMapMode: lambda.SourceMapMode.INLINE, // defaults to SourceMapMode.DEFAULT
                sourcesContent: false, // do not include original source into source map, defaults to true
                target: 'es2020', // target environment for the generated JavaScript code
            }
        });
        const httpApi = new apigateway.HttpApi(this, 'HttpApi');

        httpApi.addRoutes({
            path: '/',
            methods: [apigateway.HttpMethod.GET],
            integration: new HttpLambdaIntegration('helloWorldIntegration', helloWorldFunction)
        });
    }
}
