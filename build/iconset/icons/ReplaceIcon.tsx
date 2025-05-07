import { Icon, IconProps } from "./icon.deps.ts"

export function ReplaceIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="replace" />;
}
