export interface LocalChanges<LocalT, ResT> {
  added: LocalT[];
  updated: ResT[];
  deleted: ResT[];
}
