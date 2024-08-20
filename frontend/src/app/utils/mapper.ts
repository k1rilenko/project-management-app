export interface MapperInterface<I = any, O = any> {
  mapFrom(param: I): O;

  mapTo?(param: O): I;
}
