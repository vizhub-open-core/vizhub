import { VisualizationInfo, VISUALIZATION_TYPE } from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

export const getForks = (connection) => async ({
  forkedFrom,
}) => {
  const mongoQuery = {
    forkedFrom,
    documentType: VISUALIZATION_TYPE
  };
  const results = await fetchShareDBQuery(
    DOCUMENT_INFO,
    mongoQuery,
    connection
  );

  return results.map((shareDBDoc) => new VisualizationInfo(shareDBDoc.data));
};