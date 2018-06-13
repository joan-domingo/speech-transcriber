// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const gcsUri = 'gs://gcs-test-data/vr.flac';
const encoding = 'FLAC';
const sampleRateHertz = 16000;
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
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
