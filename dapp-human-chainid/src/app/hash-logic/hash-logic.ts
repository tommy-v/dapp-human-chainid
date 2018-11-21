import * as createKeccakHash from 'keccak';

export function createChainId(formData: string): string {
    return createKeccakHash(formData).digest().toString('hex');
}
