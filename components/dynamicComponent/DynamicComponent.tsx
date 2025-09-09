'use client';

import * as Components from './module';
import type { ComponentType } from 'react';
import { IAModuleProps } from './module/AModule';
import { IBModuleProps } from './module/BModule';

type ComponentMap = typeof Components;
export type ComponentName = keyof ComponentMap;

type DynamicComponentProps<K extends keyof ComponentMap> = {
  componentName: K;
} & React.ComponentProps<ComponentMap[K]>;

export type ModuleItem =
  | ({ componentName: 'AModule' } & IAModuleProps)
  | ({ componentName: 'BModule' } & IBModuleProps);

const DynamicComponent = <K extends keyof ComponentMap>(
  props: DynamicComponentProps<K>
) => {
  const { componentName, ...rest } = props;
  const Component = Components[componentName] as ComponentType<any>;
  return <Component {...rest} />;
};

export default DynamicComponent;
