import { Icon, IconProps } from "./icon.deps.ts"

export function BuildIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="build" />;
}
