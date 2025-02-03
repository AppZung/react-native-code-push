import { UpdateState } from '../enums/UpdateState.enum';
import { getUpdateMetadata } from '../getUpdateMetadata';

export async function getCurrentPackage() {
  return await getUpdateMetadata(UpdateState.LATEST);
}
