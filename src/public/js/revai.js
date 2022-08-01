//TOKEN
//: 02eMfINe245Xu-Y2x3sdyd9F55IHrKutRXoyBut93YV_20VleKwZ3PIgfci7cCKV0--oJlSJmh83Flv-5By3Dkjp11wPU
// https://github.com/revdotcom/revai-node-sdk/

import { RevAiApiClient } from 'revai-node-sdk';
var accessToken = "02eMfINe245Xu-Y2x3sdyd9F55IHrKutRXoyBut93YV_20VleKwZ3PIgfci7cCKV0--oJlSJmh83Flv-5By3Dkjp11wPU";
var jobId = "yQmStmJ71wKo";
var client = new RevAiApiClient(accessToken); // Initialize your client with your access token
var transcriptText = await client.getTranscriptText(jobId); // Get transcript as text
var filePath = '/Users/adrua/Documents/how-to-alter-the-perception-of-mental-health-care-in-russia-olga-kitaina-ted.mp3';

//from https://github.com/revdotcom/revai-node-sdk/blob/develop/examples/async_transcribe_local_media_file.js
const revai = require('revai-node-sdk');
const fs = require('fs');
const token = require('./config/config.json').accessToken;

async function getAccount() => {
    // Initialize your client with your Rev AI access token
    var client = new revai.RevAiApiClient(token);

    // Get account details
    var account = await client.getAccount();
    console.log(`Account: ${account.email}`);
    console.log(`Credits remaining: ${account.balance_seconds} seconds`);

    const jobOptions = {
        metadata: 'InternalOrderNumber=123456789',
        notification_config: { url: 'https://jsonplaceholder.typicode.com/posts' },
        skip_diarization: false,
        skip_punctuation: false, // Optional value available with some languages
        skip_postprocessing: false, // Optional value available with some languages
        speaker_channels_count: null, // Optional value available with some languages
        custom_vocabulary_id: null, // Optional value available with some languages
        custom_vocabularies: [{ // Optional value available with some languages
            phrases: [
                'add',
                'custom',
                'vocabularies',
                'here'
            ]
        }],
        filter_profanity: false, // Optional value available with some languages
        remove_disfluencies: false, // Optional value available with some languages
        delete_after_seconds: 2592000, // 30 days in seconds
        language: 'en', // Supported ISO 639-1 (2-letter) or ISO 639-3 (3-letter) language code
        transcriber: 'machine_v2' // Optional value for transcriber
    };

    // Media may be submitted from a local file
    var job;
    try {
        job = await client.submitJobLocalFile(filePath,
            jobOptions);
    } catch (e) {
        console.dir(e);
    }

    console.log(`Job Id: ${job.id}`);
    console.log(`Status: ${job.status}`);
    console.log(`Created On: ${job.created_on}`);

    /**
     * Waits 5 seconds between each status check to see if job is complete.
     * note: polling for job status is not recommended in a non-testing environment.
     * Use the notification_config option (see: https://docs.rev.ai/sdk/node/)
     * to receive the response asynchronously on job completion
     */
    while((jobStatus = (await client.getJobDetails(job.id)).status) == revai.JobStatus.InProgress)
    {
        console.log(`Job ${job.id} is ${jobStatus}`);
        await new Promise( resolve => setTimeout(resolve, 5000));
    }

    /**
     * Get transcript as plain text
     * Transcripts can also be gotten as Object, Text Stream, Object Stream,
     * or as captions
     */
    var transcriptText = await client.getTranscriptText(job.id);
    // var transcriptTextStream = await client.getTranscriptTextStream(job.id);
    // var transcriptObject = await client.getTranscriptObject(job.id);
    // var transcriptObjectStream = await client.getTranscriptObjectStream(job.id);
    // var captionsStream = await client.getCaptions(job.id);

    fs.writeFile('./outputs/async_file_transcript.txt', transcriptText, (err) => {
        if (err) throw err;
        console.log('Success! Check the examples/outputs/ directory for the transcript.')
    });
}();


/*Submit a local file for transcription
// initialize the client with your access token
var client = new RevAiApiClient(access_token);

// submit a local file
var job = await client.submitJobLocalFile(filePath);

// retrieve transcript
// as plain text
var transcriptText = await client.getTranscriptText(job.id)
console.log(transcriptText);
*/


