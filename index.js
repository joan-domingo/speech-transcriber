// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

const gcsUri = 'gs://flac-files-storage-test1/test.wav';
const encoding = 'LINEAR16';
const sampleRateHertz = 44100;
const languageCode = 'en-US';

const config = {
  encoding,
  sampleRateHertz,
  languageCode,
};

const audio = {
  uri: gcsUri,
};

const request = {
  config,
  audio,
};

// Detects speech in the audio file. This creates a recognition job that you
// can wait for now, or get its result later.
client
  .longRunningRecognize(request)
  .then((data) => {
    const operation = data[0];
    // Get a Promise representation of the final result of the job
    return operation.promise();
  })
  .then((data) => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
    // console.log(JSON.stringify(response, null, 2));
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
