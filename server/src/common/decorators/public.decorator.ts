import {SetMetadata} from '@nestjs/common';

export const PUBLIC_METADATA = "public";
export const Public = () => SetMetadata(PUBLIC_METADATA, true);