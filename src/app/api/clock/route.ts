import { NextResponse } from 'next/server';

// Mock database of clock entries
const clockEntries: any[] = [];

// POST handler for check in/out
export async function POST(request: Request) {
  try {
    const { userId, action, timestamp } = await request.json();
    
    if (!userId || !action || !timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Validate action
    if (action !== 'in' && action !== 'out') {
      return NextResponse.json(
        { error: 'Action must be "in" or "out"' }, 
        { status: 400 }
      );
    }
    
    // Create new entry
    const newEntry = {
      id: Date.now().toString(),
      userId,
      action,
      timestamp,
      createdAt: new Date().toISOString()
    };
    
    // Save entry
    clockEntries.push(newEntry);
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully checked ${action}`, 
      entry: newEntry 
    });
  } catch (error) {
    console.error('Clock API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// GET handler to retrieve clock entries
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' }, 
        { status: 400 }
      );
    }
    
    // Get entries for the user
    const userEntries = clockEntries.filter(entry => entry.userId === userId);
    
    return NextResponse.json({ 
      success: true, 
      entries: userEntries 
    });
  } catch (error) {
    console.error('Clock API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
