import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the contract artifact
    const artifactPath = path.join(
      process.cwd(),
      '../blockchain/artifacts/contracts/OrganicFoodTraceability.sol/OrganicFoodTraceability.json'
    );

    if (!fs.existsSync(artifactPath)) {
      return NextResponse.json(
        { success: false, error: 'Contract artifact not found. Please compile the contract first.' },
        { status: 404 }
      );
    }

    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const bytecode = artifact.bytecode;

    if (!bytecode || bytecode === '0x') {
      return NextResponse.json(
        { success: false, error: 'Contract bytecode is empty' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      bytecode: bytecode as `0x${string}`,
    });
  } catch (error: any) {
    console.error('Error reading contract bytecode:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to read bytecode' },
      { status: 500 }
    );
  }
}
