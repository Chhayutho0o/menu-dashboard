//@ts-ignore
import NProgress from 'nprogress';
import { useRouter as useNextRouter, usePathname } from '@/hooks/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function useRouter() {
  const router = useNextRouter();
  const pathname = usePathname();

  function push(
    href: string,
    options?: NavigateOptions,
    NProgressOptions?: { showProgressBar?: boolean; showTheSameUrl?: boolean },
  ) {
    if (NProgressOptions?.showProgressBar === false) return router.push(href, options);

    if (!NProgressOptions?.showTheSameUrl) {
      const currentUrl = new URL(pathname, location.href);
      const targetUrl = new URL(href, location.href);

      if (isSameURL(targetUrl, currentUrl) || href === pathname) return router.push(href, options);
    }
    NProgress.start();

    return router.push(href, options);
  }

  function back(NProgressOptions?: { showProgressBar?: boolean }) {
    if (NProgressOptions?.showProgressBar === false) return router.back();

    NProgress.start();

    return router.back();
  }

  return { ...router, push, back };
}

function isSameURL(target: URL, current: URL) {
  const cleanTarget = target.protocol + '//' + target.host + target.pathname;
  const cleanCurrent = current.protocol + '//' + current.host + current.pathname;

  return cleanTarget === cleanCurrent;
}
