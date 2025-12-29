const print = (api: string, message: string, color: 'blue' | 'red' | 'yellow' | 'green' | number): void => {
  if (color === 'blue') color = 34
  if (color === 'red') color = 31
  if (color === 'yellow') color = 33
  if (color === 'green') color = 32

  // eslint-disable-next-line no-console
  console.log(`\x1b[${color}m${api} \x1b[0m- ${message}`)
}

export default print
