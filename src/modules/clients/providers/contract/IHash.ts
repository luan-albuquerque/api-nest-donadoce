export default interface IHash {
  generateHash(payload: string) : Promise<string>
}