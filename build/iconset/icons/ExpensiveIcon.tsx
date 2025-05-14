import { Icon, IconProps } from "./icon.deps.ts"

export function ExpensiveIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="expensive" />;
}
