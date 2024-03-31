import nextMDX from '@next/mdx'

const withMDX = nextMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    // https://github.com/langchain-ai/langchain/issues/4491
    webpack: (config, { webpack }) => {
        config.externals["node:fs"] = "commonjs node:fs";
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
                /^node:/,
                (resource) => {
                    resource.request = resource.request.replace(/^node:/, '');
                },
            ),
        );

        return config;
    },
    experimental: {
        mdxRs: true,
    },
}

export default withMDX(nextConfig)