import textSegmentation from './presegment-text/text-segmentation/index.js';
import addLineBreakBetweenSentences from './presegment-text/line-break-between-sentences/index.js';
import foldWords from './presegment-text/fold/index.js';
import divideIntoTwoLines from './presegment-text/divide-into-two-lines/index.js';
import preSegmentText from './presegment-text/index.js';
import { getTextFromWordsList } from './presegment-text/index.js';

import srtGenerator from './compose-subtitles/srt.js';
import vttGenerator from './compose-subtitles/vtt.js';


function segmentedTextToList(text) {
  let result = text.split('\n\n');
  result = result.map(line => {
    return line.trim();
  });

  return result;
}

function countWords(text) {
  return text
    .trim()
    .replace(/\n /g, '')
    .replace(/\n/g, ' ')
    .split(' ').length;
}

// function countList(list) {
//   return list.length - 1;
// }

function addTimecodesToLines(wordsList, lines) {
  let startWordCounter = 0;
  let endWordCounter = 0;
  const results = lines.map((line) => {
    endWordCounter += countWords(line);
    const jsonLine = { text: line.trim() };
    jsonLine.start = wordsList[startWordCounter].start;
    jsonLine.end = wordsList[endWordCounter - 1].end;
    startWordCounter = endWordCounter;

    return jsonLine;
  });

  return results;
}

function preSegmentTextJson(wordsList, numberOfCharPerLine) {
  const result = preSegmentText(wordsList, numberOfCharPerLine);
  const segmentedTextArray = segmentedTextToList(result);

  return addTimecodesToLines(wordsList, segmentedTextArray);
}

function subtitlesComposer({ words, type, numberOfCharPerLine }) {
  const subtitlesJson = preSegmentTextJson(words, numberOfCharPerLine);
  if (typeof words === 'string') {
    return preSegmentText(words, numberOfCharPerLine);
  }
  switch (type) {
  case 'srt':
    return srtGenerator(subtitlesJson);
  case 'vtt':
    return vttGenerator(subtitlesJson);
  case 'json':
    return subtitlesJson;
  default:
    return {
      json: subtitlesJson
    };
  }
}

export {
  textSegmentation,
  addLineBreakBetweenSentences,
  foldWords,
  divideIntoTwoLines,
  getTextFromWordsList,
  preSegmentText,
  srtGenerator,
  vttGenerator
};

export default subtitlesComposer;
