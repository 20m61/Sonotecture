import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class SonotectureInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3バケットの作成
    const dataBucket = new s3.Bucket(this, 'SonotectureDataBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda関数の作成（ランタイムをnodejs18.xに変更）
    const musicGenerationFunction = new lambda.Function(
      this,
      'MusicGenerationFunction',
      {
        runtime: lambda.Runtime.NODEJS_18_X, // サポートされているランタイムに変更
        handler: 'index.handler',
        code: lambda.Code.fromAsset('lambda'), // 'lambda'ディレクトリにハンドラコードを配置
      },
    );

    // API Gatewayの作成とLambdaの接続
    const api = new apigateway.LambdaRestApi(this, 'SonotectureApi', {
      handler: musicGenerationFunction,
      proxy: false,
    });

    // "/generate-music"エンドポイントを追加
    const musicResource = api.root.addResource('generate-music');
    musicResource.addMethod('GET'); // GETメソッドを許可
  }
}
