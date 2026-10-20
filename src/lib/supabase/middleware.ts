import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This will refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Protect admin routes
  if (path.startsWith('/admin')) {
    if (!user) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    // Check if the user is an admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      // If not admin, redirect to prospecto or inquilino portal
      url.pathname = profile?.role === 'inquilino' ? '/inquilino' : '/prospecto';
      return NextResponse.redirect(url);
    }
  }

  // Protect inquilino routes
  if (path.startsWith('/inquilino')) {
    if (!user) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'inquilino' && profile?.role !== 'admin') {
      url.pathname = '/prospecto';
      return NextResponse.redirect(url);
    }
  }

  // Protect prospecto routes
  if (path.startsWith('/prospecto')) {
    if (!user) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged in users away from auth pages
  if ((path.startsWith('/login') || path.startsWith('/register')) && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profile?.role === 'admin') url.pathname = '/admin';
    else if (profile?.role === 'inquilino') url.pathname = '/inquilino';
    else url.pathname = '/prospecto';
    
    return NextResponse.redirect(url);
  }

  return supabaseResponse
}
