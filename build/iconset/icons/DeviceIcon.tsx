import { Icon, IconProps } from "./icon.deps.ts"

export function DeviceIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="device" />;
}
