import React from 'react'
import { Platform, View } from 'react-native'

import useStyles from './styles'
import { SheetProps } from './types'
import Blur from '@components/blur'

const Sheet = ({ fullscreen = false, headerWithTop = false, reordable = false, children, header, footer }: SheetProps): React.ReactElement => {
  const styles = useStyles({ reordable, fullscreen })

  return (
    <>
      {!header && <View style={[styles.headerCompensation, fullscreen && styles.fullscreen]} />}
      {header && (
        <Blur
          variant="container"
          style={[styles.headerBlur]}
        >
          <View style={[styles.header, fullscreen && styles.fullscreen]}>{header}</View>
        </Blur>
      )}

      {React.cloneElement(children, {
        overScrollMode: Platform.OS === 'android' ? 'never' : 'auto',
        removeClippedSubviews: false,
        ...(reordable && { ItemSeparatorComponent: () => <View style={styles.gap} /> }),
        ...children.props,
        contentContainerStyle: [styles.content, children.props.contentContainerStyle],
        style: [styles.root, children.props.style],
      })}

      {footer && <View style={styles.footer}>{footer}</View>}
      {!footer && <View style={styles.footerCompensation} />}
    </>
  )
}

export default Sheet
