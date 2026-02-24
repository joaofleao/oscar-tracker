import { FontsType } from './fonts'
import { LayerType } from './layer'
import { PrimitivesType } from './primitives'
import { SemanticsType } from './semantics'

export interface ThemeType {
  semantics: SemanticsType
  primitives: PrimitivesType
  fonts: FontsType
  layer: LayerType
}
