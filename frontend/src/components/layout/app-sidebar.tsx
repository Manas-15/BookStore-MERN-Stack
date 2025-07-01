'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import { navItems, settingsNavItems } from '@/constants/data';
import {
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  FolderKanban,
  Home,
  House,
  Settings
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { NavItem } from 'types';
import { Icons } from '../icons';

export const company = {
  name: 'My PF Trust',
  logo: '/pf.svg',
  plan: 'Enterprise'
};
export default function AppSidebar() {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();

  const sidebarMenuItems = pathname.startsWith('/dashboard')
    ? navItems
    : pathname.startsWith('/settings')
      ? settingsNavItems
      : navItems;
  //   : pathname.startsWith('/projectsettings')
  //     ? menuItemsTwo
  //     : pathname.startsWith('/profilesettings')
  //       ? menuItemsThree

  const getCurrentMenuName = () => {
    if (pathname.startsWith('/dashboard')) return { name: 'Home', icon: Home };
    if (pathname.startsWith('/settings'))
      return { name: 'Settings', icon: Settings };
    if (pathname.startsWith('/projectsettings'))
      return { name: 'Permissions & Roles', icon: FolderKanban };
    if (pathname.startsWith('/profilesettings'))
      return { name: 'Accounting & Finance', icon: CreditCard };
    return { name: 'Home', icon: Home };
  };

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <div className='flex gap-2 py-2 text-sidebar-accent-foreground'>
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground'>
            <img src={company.logo} width={30} height={20} alt='Company logo' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{company.name}</span>
            <span className='truncate text-xs'>{company.plan}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarMenuItems?.map((item: NavItem) => {
              const Icon =
                item.icon && Icons[item.icon as keyof typeof Icons]
                  ? Icons[item.icon as keyof typeof Icons]
                  : Home;

              console.log(
                '11111111',
                Icons,
                Icons[item.icon as keyof typeof Icons]
              );
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className='group/collapsible'
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                      >
                        {Icon && <Icon />}
                        <span>{item.title}</span>
                        <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem: NavItem) => {
                          const SubIcon = subItem.icon
                            ? Icons[subItem.icon as keyof typeof Icons]
                            : Home;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  {SubIcon && <SubIcon />}
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      {Icon && <Icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}{' '}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  {React.createElement(getCurrentMenuName().icon)}
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>
                      {getCurrentMenuName()?.name}
                    </span>
                  </div>
                  <ChevronsUpDown className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'></DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  {!pathname.startsWith('/dashboard') && (
                    <DropdownMenuItem
                      onClick={() => router.push('/dashboard/overview')}
                    >
                      <House size={20} className='mr-2' />
                      Home
                    </DropdownMenuItem>
                  )}
                  {!pathname.startsWith('/settings') && (
                    <DropdownMenuItem
                      onClick={() => router.push('/settings/overview')}
                    >
                      <Settings size={20} className='mr-2' />
                      Settings
                    </DropdownMenuItem>
                  )}

                  {/* {!pathname.startsWith('/projectsettings') && (
                    <DropdownMenuItem
                      onClick={() => router.push('/projectsettings/vendor')}
                    >
                      <FolderKanban size={20} className='mr-2' />
                      Permissions & Roles
                    </DropdownMenuItem>
                  )} */}

                  {/* {!pathname.startsWith('/profilesettings') && (
                    <DropdownMenuItem
                      onClick={() => router.push('/profilesettings/vendor')}
                    >
                      <User size={20} className='mr-2' />
                      Accounting & Finance
                    </DropdownMenuItem>
                  )} */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
