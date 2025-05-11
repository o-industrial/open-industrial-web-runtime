import { Icon, IconProps } from "./icon.deps.ts"

export function OutdatedIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="outdated" />;
}
