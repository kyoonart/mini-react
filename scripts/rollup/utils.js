import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
// 所有包的路径
const pkgPath = path.resolve(__dirname, '../../packages');
// 打包产物路径
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

// 传包名找到每个包的package.json的位置
export function getPackageJSON(pkgName) {
	// 包路径
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	return JSON.parse(str);
}

// 获取所有的公用的plugins
export function getBaseRollupPlugin({
	alias = { __DEV__: true, preventAssignment: true },
	typescript = {}
} = {}) {
	return [replace(alias), cjs(), ts(typescript)];
}
