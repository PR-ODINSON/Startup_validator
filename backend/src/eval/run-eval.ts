import { NestFactory } from '@nestjs/core';

import { AppModule } from '../app.module';

import { PipelineService } from '../agents/pipeline.service';

import {

  buildReport,

  REPORT_SECTION_KEYS,

  reportSectionCompleteness,

} from '../validation/report.builder';

import { StoredScorecard } from '../supabase/database.types';

import {

  evaluateAgentGates,

  gateFounderReport,

  printAgentGateTable,

} from './agent-gates';



const TEST_IDEAS = [

  {

    title: 'AI compliance copilot for fintech',

    description:

      'B2B SaaS that monitors regulatory changes and auto-updates policy docs for mid-size banks.',

    domain: 'Fintech',

    stage: 'Idea',

    type: 'B2B SaaS',

  },

];



function citationCoverage(result: unknown): {

  urls: number;

  claimLike: number;

} {

  const text = JSON.stringify(result);

  const urls = (text.match(/https?:\/\/[^\s"\\]+/gi) ?? []).length;

  const claimLike = (

    text.match(

      /\b(market|competitor|funding|raised|TAM|SAM|SOM|\$[\d,.]+[MBK]?|billion|million)\b/gi,

    ) ?? []

  ).length;

  return { urls, claimLike };

}



function resolveEvalIdeas(): typeof TEST_IDEAS {

  const raw = process.env.EVAL_IDEA_INDEX?.trim();

  if (raw === undefined || raw === '') {

    return TEST_IDEAS;

  }

  const index = Number(raw);

  if (!Number.isFinite(index) || index < 0 || index >= TEST_IDEAS.length) {

    console.warn(

      `EVAL_IDEA_INDEX=${raw} is invalid; running all ${TEST_IDEAS.length} ideas.`,

    );

    return TEST_IDEAS;

  }

  return [TEST_IDEAS[index]];

}



async function main() {

  const app = await NestFactory.createApplicationContext(AppModule, {

    logger: ['error', 'warn', 'log'],

  });



  const pipeline = app.get(PipelineService);

  const ideas = resolveEvalIdeas();



  console.log('=== Startup Validator — pipeline eval ===\n');

  if (ideas.length === 1 && process.env.EVAL_IDEA_INDEX?.trim() !== '') {

    console.log(`Running single idea index ${process.env.EVAL_IDEA_INDEX}\n`);

  }



  let anyFailed = false;

  let totalRateLimitEvents = 0;



  for (let i = 0; i < ideas.length; i++) {

    const idea = ideas[i];

    const started = Date.now();

    console.log(`Idea: ${idea.title}`);



    try {

      const result = await pipeline.runPipeline(idea);

      const elapsedMs = Date.now() - started;

      const stats = pipeline.getLastRunStats();

      totalRateLimitEvents += stats.rateLimitEvents;

      const coverage = citationCoverage(result);



      console.log(`  Overall score: ${result.validation.overall.score}`);

      console.log(

        `  Citation coverage (URLs / claim-like tokens): ${coverage.urls} / ${coverage.claimLike}`,

      );

      console.log(

        `  Rate-limit retries (429): ${stats.rateLimitEvents} (cooldown ${stats.cooldownMs}ms between agents)`,

      );



      const gateRows = evaluateAgentGates(result);

      console.log('  Per-agent quality gates:');

      const gatesPass = printAgentGateTable(gateRows);

      if (!gatesPass) anyFailed = true;



      const scorecard: StoredScorecard = {

        marketViability: result.validation.marketViability,

        competitionAnalysis: result.validation.competitionAnalysis,

        businessModel: result.validation.businessModel,

        pitchDeck: result.validation.pitchDeck,

        overall: result.validation.overall,

        verdict: result.validation.verdict,

        recommendations: result.validation.recommendations,

        agents: result.agents,

      };

      const report = buildReport(scorecard);

      const sections = reportSectionCompleteness(report);

      console.log('  Report sections (non-empty):');

      for (const key of REPORT_SECTION_KEYS) {

        console.log(`    ${key}: ${sections[key] ? 'yes' : 'no'}`);

      }



      const founderReport = gateFounderReport(report);

      console.log(

        `  Founder report gate: ${founderReport.pass ? 'PASS' : 'FAIL'} — ${founderReport.detail}`,

      );

      if (!founderReport.pass) anyFailed = true;



      console.log(`  Wall-clock: ${(elapsedMs / 1000).toFixed(1)}s`);

    } catch (err) {

      anyFailed = true;

      const elapsedMs = Date.now() - started;

      const stats = pipeline.getLastRunStats();

      totalRateLimitEvents += stats.rateLimitEvents;

      console.log(`  FAILED after ${(elapsedMs / 1000).toFixed(1)}s`);

      console.log(

        `  Rate-limit retries (429) before failure: ${stats.rateLimitEvents}`,

      );

      console.log(`  ${err instanceof Error ? err.message : String(err)}`);

    }



    console.log('');

  }



  await app.close();



  console.log(

    `Total 429 rate-limit retry events across run: ${totalRateLimitEvents}`,

  );



  if (anyFailed) {

    console.error('Eval finished with FAILURES.');

    process.exit(1);

  }

  console.log('Eval finished: all agent gates PASS.');

}



main().catch((err) => {

  console.error(err);

  process.exit(1);

});


