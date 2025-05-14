import { Icon, IconProps } from "./icon.deps.ts"

export function RuntimeIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="runtime" />;
}
