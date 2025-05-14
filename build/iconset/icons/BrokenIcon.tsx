import { Icon, IconProps } from "./icon.deps.ts"

export function BrokenIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="broken" />;
}
