# Scheduled polling on AWS Lambda

# Installation from Dashboard
First install the dependencies by running following command:    
```
npm install
```   

Next, go inside the folder and zip all the files. After that, upload it after creating new lambda function in the aws dashboard.

For running the files at regular intervals, go to aws lambda dashboard, chose the canary template and set the rate there and upload your code.

![alt tag](http://g.recordit.co/Y1s27Tm01V.gif) 

After that you will see something like this:

![alt tag](https://i.imgur.com/tMn5YE9.png) 

## AWS Lambda CLI   

Here is how the basic structure of AWS Lambda handler looks like:
```
exports.handler = function(event, context) {
  // Code here is executed when your lambda function is called
};
```

```
aws lambda add-permission \
--function-name CloudNanny \
--statement-id 1234 \
--action 'lambda:InvokeFunction' \
--principal events.amazonaws.com \
--source-arn arn:aws:events:us-east-1:123456789012:rule/MyScheduledRule
```

```
aws events put-targets \
--rule MyScheduledRule \
--targets '{"Id" : "1234", "Arn": "arn:aws:lambda:us-west-2:697954457995:function:CloudNanny"}'
```


For general use, the aws configure command is the fastest way to set up your AWS CLI installation.

```
aws configure
```

After that, The AWS CLI will prompt you for four pieces of information. AWS Access Key ID and AWS Secret Access Key are your account credentials. If you don't have keys, see the Getting Set Up section earlier in this guide.      
```
AWS Access Key ID [None]: AKIAIOSFOJKASFG7EXAMPLE
AWS Secret Access Key [None]: wJalrXXCVBFI/K743DCNG/bPxRfADFGYEXAMPKEY
Default region name [None]: us-west-2
Default output format [None]: json
```

For more details, check [aws documentation](http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/RunLambdaSchedule.html)
